import Avatar from "@/app/components/Avatar";
import { FullMessageType } from "@/app/types";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useMemo } from "react";

interface messageBoxProps {
  message:FullMessageType
}

const MessageBox: React.FC<messageBoxProps> = ({ message }) => {
    const session=useSession()
    const isOwn=useMemo(()=>{
       return message?.sender?.email===session.data?.user?.email
    },[message,session])

    const seenList = (message.seen || [])
    .filter((user) => user.email !== message?.sender?.email)
    .map((user) => user.name)
    .join(', ');
  return (
    <div className={clsx(`flex gap-5 p-4  `, isOwn && "justify-end")}>
      <div className={clsx(isOwn && "order-2")}>
        <Avatar user={message?.sender} />
      </div>
      <div className={clsx(`flex flex-col gap-2`)}>
        <div className={clsx(`flex items-center gap-1`, isOwn && "justify-end")}>
          <div className="text-sm text-gray-500">{message.sender.name}</div>
          <div className="text-xs text-gray-400">{format(new Date(message?.createdAt), "p")}</div>
        </div>
        <div >
          {
            message?.image?
            <Image src={message?.image || "/images/placeholder.jpg"} width={200} height={200} alt="img"
            className="transition hover:transform hover:scale-110 ease-in"/>:
            <p className={clsx(`text-justify text-base p-3 shadow-lg rounded-tr-xl rounded-bl-xl`,isOwn&&'bg-sky-600 text-white')}>
              {message.body}
            </p>
          }
        </div>
        <div>
          {
            isOwn &&  <span>{`Seen by ${seenList}`}</span>
          }
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
