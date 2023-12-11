"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast/headless";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { useRouter } from "next/navigation";
import axios from "axios";
type Variant = "LOGIN" | "REGISTER";
const AuthForm = () => {
  const [loading, setLoading] = useState(false);
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const router=useRouter()
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleToggle = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  },[variant]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    toast.success("User Create successfully")
    setLoading(true)
    if(variant==='REGISTER'){
      axios.post('/api/register',data)
      .then(res=>{
        signIn('credentials',{
          ...data,
          redirect:false
         })
         .then(res=>{
           console.log(res);
           
           if(res?.error){
             toast.error("SomeThing is Wrong")
           }
           if(res?.ok && !res?.error){
             toast.success("User created successfully")
             router.push('/users')
           }
         })
      })
      .catch(err=>console.log(err))

      .finally(()=>setLoading(false))
     
    }

    if(variant==='LOGIN'){
      signIn('credentials',{
       ...data,
       redirect:false
      })
      .then(res=>{
        console.log(res);
        
        if(res?.error){
          toast.error("SomeThing is Wrong")
        }
        if(res?.ok && !res?.error){
          toast.success("Login successfully")
          router.push('/users')
        }
      })
      .catch(err=>{
        toast.error("SomeThing is Wrong");
      })
      .finally(()=>{
        setLoading(false)
      })
    }
  }

  return (
    <div className="mt-4 sm:max-w-md mx-auto shadow-lg bg-white p-5 rounded-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        {variant === "REGISTER" && (
          <Input
            label="Name"
            id="name"
            type="text"
            disabled={loading}
            errors={errors}
            register={register}
          />
        )}
        <Input
          label="Enter Email"
          id="email"
          type="email"
          disabled={loading}
          errors={errors}
          register={register}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          disabled={loading}
          errors={errors}
          register={register}
        />
        <Button type="submit"  disabled={loading} fullWidth={true}>
          {variant === "LOGIN" ? "Sign in" : "Register"}
        </Button>
      </form>

      <div className="mt-3">
        <div className="flex justify-between items-center">
          <div className="w-1/3 border-t-2 bg-gray-300"></div>
          <div>or</div>
          <div className="w-1/3 border-t-2 bg-gray-300"></div>
        </div>
      </div>
      <div className="mt-3">
        <div className="flex justify-between items-center gap-x-2">
          <button className="inline-flex w-full justify-center ring-1 ring-inset py-1 hover:bg-gray-50">
            <BsGithub size={30} />
          </button>
          <button className="inline-flex w-full justify-center ring-1 ring-inset py-1 hover:bg-gray-50">
            <BsGoogle size={30} />
          </button>
        </div>
      </div>
      <div className="mt-3 flex justify-center items-center gap-x-3">
        <div>
          {variant === "LOGIN" ? "New in Messanger?" : "Are You have Account?"}
        </div>
        <div className="text-sm text-gray-500" onClick={handleToggle}>
          {variant === "LOGIN" ? "Create an account" : "Login"}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
