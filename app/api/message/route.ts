import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { pusherServer } from "@/lib/pusher";
export async function POST(request:Request){
    const body=await request.json();
    const currentUser=await getCurrentUser()
    const {
        message,
        image,
        conversationId
    }=body

    if(!currentUser?.email || !currentUser.id){
        return new NextResponse('Unauthorized', { status: 401 });
    }
    try {
        const newMessage=await prisma.message.create({
            include:{
                seen:true,
                sender:true
            },
            data:{
                body:message,
                image:image,
                conversation: {
                    connect: { id: conversationId }
                },
                sender:{
                    connect:{id:currentUser.id}
                },
                seen:{
                    connect:{id:currentUser.id}
                }
            }
        })

        const updatedConversation = await prisma.conversation.update({
            where: {
              id: conversationId
            },
            data: {
              lastMessage: new Date(),
              messages: {
                connect: {
                  id: newMessage.id
                }
              }
            },
            include: {
              users: true,
              messages: {
                include: {
                  seen: true
                }
              }
            }
          });

          await pusherServer.trigger(conversationId, 'messages:new', newMessage);

          const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1];
      
          updatedConversation.users.map((user) => {
            pusherServer.trigger(user.email!, 'conversation:update', {
              id: conversationId,
              messages: [lastMessage]
            });
          });


        return NextResponse.json(newMessage)
    } catch (error:any) {
        return new NextResponse(error)
    }
 
}