import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { pusherServer } from "@/lib/pusher";
import { NextResponse } from "next/server";
interface IParams {
    conversationId?: string;
  }
  
  export async function DELETE(
    request: Request,
    { params }: { params: IParams }
  ) {
    try {
      const { conversationId } = params;
      const currentUser = await getCurrentUser();

      console.log(conversationId);
      
  
      if (!currentUser?.id) {
        return NextResponse.json(null);
      }
  
      
        const existingConversation=await prisma.conversation.findUnique({
            where:{
                id:params.conversationId
            },
            include:{
                users:true
            }
        })

        if(!existingConversation){
            return new NextResponse('Invalid ID', { status: 400 });
        }

        const deletedConversation = await prisma.conversation.deleteMany({
            where: {
              id: params.conversationId,
              userIds: {
                hasSome: [currentUser.id]
              },
            },
          });

          existingConversation.users.forEach(user=>{
            if(user.email){
              pusherServer.trigger(user.email,"conversation:remove",existingConversation)
            }
          })

          return NextResponse.json(deletedConversation)
    } catch (error) {
        return NextResponse.json(error);
    }

}