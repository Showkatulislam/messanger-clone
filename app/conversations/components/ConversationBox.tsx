"use client";
import Avatar from "@/app/components/Avatar";
import clsx from "clsx";
import Link from "next/link";
import React, { useState, useMemo, useCallback } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import ConversationModel from "../[conversationId]/components/ConversationModel";
import { FullConversationType } from "@/app/types";
import { useSession } from "next-auth/react";
import { format } from "date-fns/esm";
import { useRouter } from "next/navigation";
import useOtherUser from "@/app/hooks/useOtherUser";
import AvatarGroup from "@/app/components/AvatarGroup";

interface ConversationBoxProps {
  selected?: boolean;
  id: string;
  conversation: FullConversationType;
}
const ConversationBox: React.FC<ConversationBoxProps> = ({
  selected,
  id,
  conversation,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();
  const router = useRouter();

  const handleClose = () => {
    setIsOpen(false);
  };

  const otherUser = useMemo(() => {
    const users = conversation.users.filter(
      (u) => u.email != session?.data?.user?.email
    );
    return users[0];
  }, [conversation.users, session]);

  const lastMessage = useMemo(() => {
    const messages = conversation.messages || [];
    return messages[messages.length - 1];
  }, [conversation.messages]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }
    const seenArray = lastMessage.seen || [];

    return (
      seenArray.filter((u) => u.email === session.data?.user?.email).length !==
      0
    );
  }, [lastMessage, session.data?.user?.email]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Image send";
    }
    if (lastMessage?.body) {
      return lastMessage.body;
    }
    return "New Conversation Start";
  }, [lastMessage]);

  const handleClick= (() => {
    router.push(`/conversations/${conversation.id}`);
  },[conversation,router])

  return (
    <>
      <ConversationModel
        conversation={conversation}
        user={otherUser}
        isOpen={isOpen}
        closeModal={handleClose}
      />

      <div
        className={clsx(
          `
        w-full 
        relative 
        flex
        items-center
        space-x-3
        hover:bg-neutral-100
        transition
        cursor-pointer
        p-3`,
          selected && "bg-gray-100"
        )}
        onClick={handleClick}
      >
        {conversation?.isGroup ? (
          <AvatarGroup users={conversation.users} />
        ) : (
          <Avatar user={otherUser} />
        )}
        <div className=" flex flex-col w-full" >
          <div className="flex justify-between">
            <div className="flex gap-3 " >
              <p className="text-base text-gray-900">
                {conversation.name || otherUser.name}
              </p>
            </div>
{  /*         <div role="button" onClick={() => setIsOpen(true)}>
              <HiDotsHorizontal className="ml-5" size={22} />
        </div>*/}
          </div>

          <div className="flex justify-between w-ful  items-center">
            <p
              className={clsx(
                `
                      truncate 
                      text-sm
                      `,
                hasSeen ? "text-gray-500" : "text-black font-medium"
              )}
            >
              {lastMessageText}
            </p>

            {lastMessage?.createdAt && (
              <p className="text-xs">
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ConversationBox;
