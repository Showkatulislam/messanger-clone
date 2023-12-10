import getCurrentUser from "./getCurrentUser"
import prisma from "@/lib/prismadb"
const getConversation=async()=>{
  const currentuser=await getCurrentUser()
  try {
    
    const conversation=await prisma.conversation.findMany({
        orderBy:{
            createdAt:'desc'
        },
        where:{
            userIds:{
                has:currentuser?.id
            }
        },
        include:{
            users:true,
            messages:{
                include:{
                    seen:true,
                    sender:true
                }
            }
        }
    })

    return conversation

  } catch (error) {
    return []
  }
}

export default getConversation