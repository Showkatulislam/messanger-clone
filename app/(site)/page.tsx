import Image from "next/image";
import AuthForm from "../components/AuthForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-12 bg-gray-100">
      <div className="sm:max-w-md sm:mx-auto sm:w-full">
        <Image 
        className="mx-auto w-auto"
        src="/images/logo.png"
        alt="logo"
        width="48"
        height="48"
        />
        <div className="text-center py-4">
          <h1 className="font-semibold text-gray-800 text-3xl  tracking-tight ">Sign in your Account</h1>
        </div>
        <AuthForm/>
      </div>
    </main>
  );
}
