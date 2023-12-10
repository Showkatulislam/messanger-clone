import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from '@/lib/prismadb';
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'

 const authOptions:NextAuthOptions={
    adapter:PrismaAdapter(prisma),
    providers:[
        CredentialsProvider({
            name:'credentials',

            credentials: {
                email: { label: "email", type: "email"},
                password: { label: "password", type: "password" }
              },

              async authorize(credentials,req){
               
                if(!credentials?.email || !credentials?.password){
                  throw new Error("Invalid credentails");
                }
                console.log(credentials?.email);
                
                const user = await prisma.user.findUnique({
                  where:{
                    email:credentials.email
                  }
                })

                console.log(user)

                if(!user || !user?.hashedpassword){
                  throw new Error("Invalid credentails ");
                }

                const isCorrectPassword=await bcrypt.compare(credentials.password,user?.hashedpassword);

                if(!isCorrectPassword){
                  throw new Error("Invalid credentails")
                }
                return user;
              }
        })
    ],
    debug: process.env.NODE_ENV === 'development',
    session: {
      strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET
}


const handler=NextAuth(authOptions);

export { handler as GET, handler as POST,authOptions};