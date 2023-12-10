"use client"
import Avatar from "@/app/components/Avatar";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface userboxProps{
  user:User
}
const UserBox:React.FC<userboxProps> = ({user}) => {
  const router = useRouter();
  const createConversation=useCallback(()=>{
      axios.post('/api/conversations',{
        id:user.id
      })
      .then(res=>{
        router.push(`/conversations/${res.data.id}`);
      })
    },[user,router])
  return (
      <div role="button" onClick={createConversation} className="flex  gap-x-4 items-center px-5 py-2 hover:bg-slate-100">
        <Avatar user={user} />
        <p className="text-gray-900 font-semibold">{user?.name}</p> 
      </div>
  );
};

export default UserBox;
