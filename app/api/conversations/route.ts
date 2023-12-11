import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { pusherServer } from "@/lib/pusher";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  const body = await request.json();
  const { id, isGroup, members, name } = body;
  console.log(body);

  try {
    if (isGroup) {
      const newConversation = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: { value: string }) => ({
                id: member.value,
              })),
              {
                id: currentUser?.id,
              },
            ],
          },
        },
        include: {
          users: true,
        },
      });

      // Update all connections with new conversation
      newConversation.users.forEach((user) => {
        if (user.email) {
          pusherServer.trigger(user.email, "conversation:new", newConversation);
        }
      });
      return NextResponse.json(newConversation);
    }

    const existingConversation = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser?.id, id],
            },
          },
          {
            userIds: {
              equals: [id, currentUser?.id],
            },
          },
        ],
      },
    });

    const singleConversation = existingConversation[0];

    if (singleConversation) {
      return NextResponse.json(singleConversation);
    }
    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [{ id: id }, { id: currentUser?.id }],
        },
      },
      include: {
        users: true,
      },
    });

    newConversation.users.map((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, "conversation:new", newConversation);
      }
    });

    return NextResponse.json(newConversation);
  } catch (error: any) {
    return new NextResponse(error);
  }
}
