'use client'
import useConversations from "@/app/hooks/useConversations";
import useRouter from "@/app/hooks/useRouter";
import clsx from "clsx";
import MobileSiderbarItem from "./MobileSiderbarItem";

const MobileSidebar = () => {
    const {isOpen}=useConversations()
    const router=useRouter()
    return (
        <div className={clsx(
          `lg:hidden
          fixed
          left-0
          bottom-0
          z-10
          bg-gray-200
          w-full
          py-2
          px-5
          rounded-lg
          `,isOpen&&'hidden'
        )}>
            <div className="flex justify-between items-center">
            {
               router.map((route)=>(
                <MobileSiderbarItem icon={route.icon} href={route.href} label={route.label} key={route.label} onClick={route.onClick}></MobileSiderbarItem>
               )) 
            }
            </div>
        </div>
    );
};

export default MobileSidebar;