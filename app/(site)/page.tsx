import AuthForm from "../components/AuthForm";
import { AiOutlineWechat } from "react-icons/ai";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-12 bg-gray-100">
      <div className="sm:max-w-md sm:mx-auto sm:w-full">
      <AiOutlineWechat className="w-12 h-12 rounded-full text-indigo-600" />
        <div className="text-center py-4">
          <h1 className="font-semibold text-gray-800 text-3xl  tracking-tight ">Sign in your Account</h1>
        </div>
        <AuthForm/>
      </div>
    </main>
  );
}
