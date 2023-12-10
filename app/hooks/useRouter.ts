import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import {HiChat} from 'react-icons/hi'
import {
    HiArrowLeftOnRectangle,
    HiUsers
} from 'react-icons/hi2'
const useRouter = () => {
    const pathname=usePathname()
    const routes=useMemo(()=>[
        {
            label:'Chat',
            href:'/conversations',
            icon:HiChat,
            active:pathname==='/conversations'
        },
        {
            label:'Users',
            href:'/users',
            icon:HiUsers,
            active:pathname==='/user'
        },
        {
            label:'logout',
            href:'#',
            icon:HiArrowLeftOnRectangle,
            onClick:()=>signOut(),
        }
    ],[])
    return routes
};

export default useRouter;