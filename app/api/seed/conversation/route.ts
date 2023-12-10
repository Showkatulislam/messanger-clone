import prisma from "@/lib/prismadb"

import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request:NextRequest) {
    const id=request.nextUrl.searchParams.get('id')
    let users;
    if(id){
        users=await prisma.conversation.deleteMany();
    }else{
       users=await prisma.conversation.findMany({
        include:{
            users:true,
            messages:true
        }
       });
    }
    
    return NextResponse.json(users)
}