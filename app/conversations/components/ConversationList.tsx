'use client'
import clsx from "clsx";
import ConversationBox from "./ConversationBox";
import useConversations from "@/app/hooks/useConversations";
import { FullConversationType } from "@/app/types";
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/lib/pusher";
import { find } from "lodash";
import { useRouter } from "next/navigation";
interface conversationlistProps{
  initailItems:FullConversationType[]
}

const ConversationList:React.FC<conversationlistProps> = ({initailItems}) => {
    const [conversations,setConversations]=useState(initailItems)
    const {isOpen,conversationId}=useConversations()
    const session=useSession()
    const router=useRouter()

    const pusherKey=useMemo(()=>{
      return session.data?.user?.email
    },[session.data?.user?.email])

    useEffect(()=>{
      if(!pusherKey) return;
      pusherClient.subscribe(pusherKey);

      const newHandler=(conversation:FullConversationType)=>{
        setConversations((current)=>{
          if(find(current,{id:conversation.id})){
            return current
          }
          return [conversation,...current]
          
        })
      }
      
      const handleupdate=(conversation:FullConversationType)=>{
        setConversations(current=>current.map(currentConversation=>{
          if(currentConversation.id===conversation.id){
              return {
                ...currentConversation,
                messages:conversation.messages
              }
          }
          return currentConversation;
        }))
      }

      const handleDelete=(conversation:FullConversationType)=>{
        setConversations(current=>{
          return current.filter(con=>con.id!==conversation.id)
        })
        if(conversationId===conversation.id){
          router.push("/conversations")
        }
      }

      pusherClient.bind("conversation:new",newHandler)
      pusherClient.bind("conversation:update",handleupdate)
      pusherClient.bind("conversation:remove",handleDelete)

      return ()=>{
        pusherClient.unsubscribe(pusherKey);
        pusherClient.unbind("conversation:new",newHandler)
        pusherClient.unbind("conversation:update",handleupdate)
        pusherClient.unbind("conversation:remove",handleDelete)
      }
    },[pusherKey,conversationId,router])

  return (
    <div
      className={clsx(`fixed 
      inset-y-0 
      pb-20
      lg:pb-0
      lg:left-20 
      lg:w-80 
      lg:block
      overflow-y-auto 
      lg:border-r 
      bg-white
      border-gray-200
      block w-full left-0`,
      isOpen?"hidden":"w-full block left-0")}
    >
      <p className="text-2xl py-3 font-semibold">Messages</p>

      <div>
        {
            conversations.map((conversation,i)=>(
                <ConversationBox key={conversation.id} selected={conversation.id===conversationId} conversation={conversation} id={conversation.id}/>
            ))
        }
      </div>
    </div>
  );
};

export default ConversationList;
