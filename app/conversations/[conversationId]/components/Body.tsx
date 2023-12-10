'use client'
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import { FullMessageType } from "@/app/types";
import axios from "axios";
import useConversations from "@/app/hooks/useConversations";
import { pusherClient } from "@/lib/pusher";
import { find } from "lodash";
interface bodydataProp{
    initialMessages:FullMessageType[]
}
const Body:React.FC<bodydataProp> = ({initialMessages}) => {
    const [messages,setMessages]=useState(initialMessages)
    const {conversationId}=useConversations()
    console.log(messages)
    const bottomRef=useRef<HTMLDivElement>(null)
/*     useEffect(()=>{
        bottomRef?.current?.scrollIntoView();
    },[]) */
    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`);
      }, [conversationId]);

      useEffect(() => {
        pusherClient.subscribe(conversationId)
        bottomRef?.current?.scrollIntoView();
    
        const messageHandler = (message: FullMessageType) => {
          axios.post(`/api/conversations/${conversationId}/seen`);
    
          setMessages((current) => {
            if (find(current, { id: message.id })) {
              return current;
            }
    
            return [...current, message]
          });
          
          bottomRef?.current?.scrollIntoView();
        };
    
        const updateMessageHandler = (newMessage: FullMessageType) => {
          setMessages((current) => current.map((currentMessage) => {
            if (currentMessage.id === newMessage.id) {
              return newMessage;
            }
      
            return currentMessage;
          }))
        };
      
    
        pusherClient.bind('messages:new', messageHandler)
        pusherClient.bind('message:update', updateMessageHandler);
    
        return () => {
          pusherClient.unsubscribe(conversationId)
          pusherClient.unbind('messages:new', messageHandler)
          pusherClient.unbind('message:update', updateMessageHandler)
        }
      }, [conversationId]);
    
    return (
        <div className="flex-1 flex flex-col gap-3 px-4 overflow-y-auto py-6">
            {
               messages?.map(message=>(
                    <MessageBox message={message} key={message.id}/>
                ))
            }
            <div ref={bottomRef} className="pt-24">
            </div>
        </div>
    );
};

export default Body;