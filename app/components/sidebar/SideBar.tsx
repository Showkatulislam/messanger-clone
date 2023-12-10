import React from "react";
import Desktopsidebar from "./Desktopsidebar";
import MobileSidebar from "./MobileSidebar";
import getCurrentUser from "@/app/actions/getCurrentUser";


interface sidebarProps{
    children:React.ReactNode
}
const SideBar:React.FC<sidebarProps> =async ({children}) => {
    const user=await getCurrentUser()
    return (
        <div className="h-full">
            <Desktopsidebar user={user}/>
            <MobileSidebar/>
            <main className="lg:pl-20 h-full">
            {children}
            </main>
        </div>
    );
};

export default SideBar;