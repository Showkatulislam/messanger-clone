import { getServerSession } from "next-auth";
import { authoptions } from "../api/auth/[...nextauth]/route"; 

export default async function getSession(){
    return await getServerSession(authoptions)
}