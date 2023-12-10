import { User } from "@prisma/client";
import clsx from "clsx";
import Image from "next/image";
import useActiveList from "../hooks/useActiveList";
interface avatarProps {
  user:User
}
const Avatar:React.FC<avatarProps> = ({user}) => {
  const {members}=useActiveList()
  const isActive=members.indexOf(user?.email!)!==-1;
  return (
    <div className={clsx(`rounded-full w-12 h-12 relative`)}>
      <Image
        alt="avatar"
        src={user?.image || `/images/placeholder.jpg`}
        width={48}
        height={48}
        className="rounded-full object-cover overflow-hidden"
      />
    {
      isActive&&(
        <span className="absolute   w-3 h-3 rounded-full bg-green-500 top-0"></span>
      )
    }
    </div>
  );
};

export default Avatar;
