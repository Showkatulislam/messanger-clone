import React from "react";

import SideBar from "../components/sidebar/SideBar";
import ConversationList from "./components/ConversationList";
import getConversation from "../actions/getConversations";


export default async function Layout({
    children
}:{
    children:React.ReactNode
}){
    const conversations=await getConversation()
    console.log(conversations);
    
    return(
        <SideBar>
           <div className="h-full">
            <ConversationList initailItems={conversations}/>
                {children}
           </div>
        </SideBar>
    )
}
