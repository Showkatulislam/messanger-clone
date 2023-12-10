import getSession from "./getSession"
import prisma from "@/lib/prismadb";
const getCurrentUser=async()=>{
    const session=await getSession();
    if(!session?.user?.email){
        return null;
    }
    try {
        const user=await prisma.user.findUnique({
            where:{
                email:session?.user?.email as string
            }
        })

        return user
    } catch (error) {
        return null;
    }
}

export default getCurrentUser