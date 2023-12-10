'use client'
import Avatar from "@/app/components/Avatar";
import Modal from "@/components/Modal";
import { FaTrashAlt } from "react-icons/fa";
import { format } from "date-fns";
import { Conversation, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useCallback } from "react";
import toast from "react-hot-toast";
interface modelProps {
  isOpen?: boolean;
  closeModal: () => void;
  user: User;
  conversation: Conversation;
}

const ConversationModel: React.FC<modelProps> = ({
  isOpen,
  closeModal,
  user,
  conversation,
}) => {
  const router=useRouter()
  const {id:conversationId}=conversation

  const onDelete = useCallback(() => {
   axios.delete(`/api/conversations/${conversationId}`)
   .then(res=>{
    closeModal()
    toast.success("Conversation Delete Successfully.")
    router.push('/conversations')
   })
   .catch(err=>{
    toast.error("Delete Fail..")
   })
  
  }, [router,conversationId,closeModal])

  return (
    <div>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <div className="pb-10">
          <div className="flex flex-col gap-3 items-center justify-center">
            <Avatar user={user} />
            <div>
              <p className="text-sm text-gray-500">Active 1 hrs ago</p>
            </div>
            <div>
              <p className="text-base">{conversation?.name || user?.name}</p>
            </div>
            <div>
              <button  onClick={onDelete} className="ouline-none border-0 w-8 h-8 bg-gray-200 flex items-center justify-center rounded-full">
                <FaTrashAlt className="text-rose-600" size={22} />
              </button>
            </div>
            <hr className="my-4 border w-full" />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-base">Conversations start at</p>
            {conversation?.createdAt && (
              <p className="text-sm">
                {format(new Date(conversation?.createdAt), "MM/dd/yyyy")}
              </p>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ConversationModel;
