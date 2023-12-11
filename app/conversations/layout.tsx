import React from "react";

import SideBar from "../components/sidebar/SideBar";
import ConversationList from "./components/ConversationList";
import getConversation from "../actions/getConversations";
import getUsers from "../actions/getUsers";


export default async function Layout({
    children
}:{
    children:React.ReactNode
}){
    const conversations=await getConversation()
    const users=await getUsers()
    
    return(
        <SideBar>
           <div className="h-full">
            <ConversationList users={users} initailItems={conversations}/>
                {children}
           </div>
        </SideBar>
    )
}
