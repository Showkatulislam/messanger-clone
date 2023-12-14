
import { redirect } from "next/navigation";
import getSession from "../actions/getSession";
import AuthForm from "../components/AuthForm";
import { AiOutlineWechat } from "react-icons/ai";
export default async function Home() {
  const session=await getSession()
  if(session?.user?.email){
    redirect("/users")
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-12 bg-gray-100">
      <div className="sm:max-w-md sm:mx-auto sm:w-full">
      <div className="flex justify-center items-center">
      <AiOutlineWechat className="w-12 h-12 rounded-full text-indigo-600" />
      </div>
        <div className="text-center py-4">
          <h1 className="font-semibold text-gray-800 text-3xl  tracking-tight ">Welcome Our Chat Buddy</h1>
        </div>
        <AuthForm/>
      </div>
    </main>
  );
}
