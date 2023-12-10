import { NextResponse } from "next/server"
import bcrypt from 'bcrypt'
import prisma from "@/lib/prismadb"
export async function POST(request:Request) {
    try {
        const body=await request.json()
        const {name,email,password}=body
    
        console.log(name,email,password);
        
        if(!name || !email || !password){
            return new NextResponse("Something is missing");
        }
    
        const hashedpassword=await bcrypt.hash(password,10);
    
        const user=await prisma.user.create({
            data:{
                name,
                email,
                hashedpassword
            }
        })
    
        return NextResponse.json(user,{status:200});
    } catch (error) {
        return new NextResponse("Internal Error",{status:501})
    }
}