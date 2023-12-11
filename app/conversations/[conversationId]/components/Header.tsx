'use client'
import React, { useMemo, useState } from "react";
import Avatar from "@/app/components/Avatar";
import Link from "next/link";
import { HiArrowLeft, HiDotsHorizontal } from "react-icons/hi";
import ConversationModel from "./ConversationModel";
import useOtherUser from "@/app/hooks/useOtherUser";
import useActiveList from "@/app/hooks/useActiveList";
import AvatarGroup from "@/app/components/AvatarGroup";

interface HeaderProps {
  conversation:any
}
const Header:React.FC<HeaderProps> = ({conversation}) => {
  const [isOpen,setIsOpen]=useState(false);
  const modalClose=()=>{
    setIsOpen(false);
  }
  const otherUser=useOtherUser(conversation)
  const {members}=useActiveList();

  const isActive=members.indexOf(otherUser?.email!)!==-1;

  const statusText=useMemo(()=>{
    return isActive?'Active':'offline';
  },[isActive])

  return (
    <>
       <ConversationModel conversation={conversation} user={otherUser}  isOpen={isOpen} closeModal={modalClose}/>
      <div
        className="
        bg-white
        px-6
        py-3
        border-b
        border-gray-200
        flex
        justify-between
        items-center
        gap-x-4
        w-full"
      >
        <div
          className="
      flex
      items-center
      gap-x-3"
        >
          <Link
            className="
            lg:hidden
            block
            text-sky-600
            font-bold"
            href={"/conversations"}
          >
            <HiArrowLeft size={22} />
          </Link>
          <div className="flex items-center gap-x-3">
          {conversation?.isGroup ? (
          <AvatarGroup users={conversation.users} />
        ) : (
          <Avatar user={otherUser} />
        )}
            <div>
              <p className="text-base text-gray-700 font-medium">{conversation.name ||otherUser.name}</p>
              <span className="text-sm">
                {statusText}
              </span>
            </div>
          </div>
        </div>
        <div className="text-sky-600 font-bold" onClick={()=>setIsOpen(true)}>
          <HiDotsHorizontal size={22}  />
        </div>
      </div>
    </>
  );
};

export default Header;
