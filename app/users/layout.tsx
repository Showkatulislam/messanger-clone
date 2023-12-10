import React from "react";
import Userlist from "./components/Userlist";
import SideBar from "../components/sidebar/SideBar";
import getUsers from "../actions/getUsers";


export default async function Layout({
    children
}:{
    children:React.ReactNode
}){
    const users=await getUsers()
    return(
        <SideBar>
           <div className="h-full">
           <Userlist users={users}/>
                {children}
           </div>
        </SideBar>
    )
}
