"use client";
import useConversations from "@/app/hooks/useConversations";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { FieldValues, useForm ,SubmitHandler} from "react-hook-form";
import {  HiArrowCircleRight } from "react-icons/hi";
import { HiPhoto } from "react-icons/hi2";

const Form = () => {
  const {conversationId}=useConversations()
  const router=useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: ''
    }
  });

  const onSubmit:SubmitHandler<FieldValues>=(data)=>{
    setValue('message', '', { shouldValidate: true });
    axios.post('/api/message',{
      ...data,
      conversationId
    })
    .then(()=>{
      router.refresh();
    })
    

  }

  const handleUpload = (result: any) => {
    axios.post('/api/message', {
      image: result.info.secure_url,
      conversationId: conversationId
    })
    .then(()=>{
      router.refresh();
    })
  }

  return (
    <div className="flex items-center mx-4 py-2 gap-x-4 mb-10 lg:mb-2">
      <div>
       <CldUploadButton
        options={{ maxFiles: 1 }} 
        onUpload={handleUpload} 
        uploadPreset="lz4w8fhv">
       <HiPhoto className="text-sky-600" size={30} />
       </CldUploadButton>
      </div>

      <div className="flex-1">
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-x-4">
          <input
            type="text"
            id="message"
            className="w-full py-1 px-2 ring-1 inset-1 focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-xl"
            {...register("message")}
          />
          <button type="submit">
            <HiArrowCircleRight className="text-sky-600" size={28} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
