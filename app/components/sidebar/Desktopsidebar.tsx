"use client";
import useRouter from "@/app/hooks/useRouter";
import DesktopItem from "./DesktopItem";
import Avatar from "../Avatar";
import { useState } from "react";
import ProfileSetting from "./ProfileSetting";
import { User } from "@prisma/client";
interface desktopsidebar{
  user:any
}
const Desktopsidebar:React.FC<desktopsidebar> = ({user}) => {
  const routes = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const handleCloseModel = () => {
    setIsOpen(false);
  };
  return (
    <>
    <ProfileSetting user={user} isOpen={isOpen} onClose={handleCloseModel}/>
      <div
        className="
        hidden
        lg:fixed
        lg:inset-y-0
        lg:left-0
        lg:z-40
        lg:w-20
        lg:overflow-y-auto
        lg:px-2
        xl:px-6
        lg:flex
        lg:flex-col
        lg:justify-between
        border-r
        border-gray-300
        "
      >
        <nav className="flex flex-col justify-between">
          <ul
            role="list"
            className="flex justify-between flex-col gap-y-5 my-10"
          >
            {routes.map((route, i) => (
              <DesktopItem
                key={i}
                icon={route.icon}
                label={route.label}
                href={route.href}
                onClick={route.onClick}
                active={route.active}
              ></DesktopItem>
            ))}
          </ul>
        </nav>
        <nav role="button" onClick={()=>setIsOpen(true)} className="my-10 flex items-center justify-center">
          <Avatar user={user} />
        </nav>
      </div>
    </>
  );
};

export default Desktopsidebar;
