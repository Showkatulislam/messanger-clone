import React from "react";
import UserBox from "./UserBox";
import { User } from "@prisma/client";

interface userlistProps{
  users:User[]
}

const Userlist:React.FC<userlistProps> = ({users}) => {
  return (
    <div className="fixed
     inset-y-0
     lg:border-r
     w-full 
     lg:border-gray-300  
     overflow-y-auto
     lg:w-80">
      <div className="">
        <p className="font-semibold text-2xl lg:px-3 py-2 px-5 mb-6">People</p>
      </div>
      <div className="flex flex-col gap-y-4 overflow-y-auto">
        {users.map((user) => (
          <UserBox key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Userlist;
