'use client'
import Modal from "@/components/Modal";
import React, { useEffect, useState } from "react";
import Input from "@/components/Input";
import { FieldValues, useForm,SubmitHandler } from "react-hook-form";
import Button from "@/components/Button";
import { User } from "@prisma/client";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import axios from "axios";
import { useRouter } from "next/navigation";



interface profileSettingProps{
    isOpen:boolean;
    onClose:()=>void;
    user:User
}
const ProfileSetting:React.FC<profileSettingProps> = (
    {
        isOpen,
        onClose,
        user
    }
) => {
    const [loading,setLoading]=useState(false)
    const router=useRouter()
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState:{
            errors
        }
    }=useForm<FieldValues>({
        defaultValues:{
            name:user.name,
            image:user.image
        }
    })
    const image = watch('image');
    
    const handleUpload = (result: any) => {
        setValue('image', result.info.secure_url, { 
          shouldValidate: true 
        });
      }

      const onSubmit: SubmitHandler<FieldValues> = (data) => {
        axios.post('/api/setting', data)
        .then(() => {
          router.refresh();
          onClose();
        })
      }

   
    return (
        <Modal isOpen={isOpen} closeModal={onClose}>
            <div className="flex flex-col">
            <h2 
              className="
                text-base 
                font-semibold 
                leading-7 
                text-gray-900
              "
            >
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Edit your public information.
            </p>
                <div className="flex items-center gap-5 py-5">
                    <Image
                    width="48"
                    height="48" 
                    className="rounded-full" 
                    src={image || user?.image || '/images/placeholder.jpg'}
                    alt="Avatar"
                  />
                 <CldUploadButton
                  options={{ maxFiles: 1 }} 
                  onUpload={handleUpload} 
                  uploadPreset="lz4w8fhv"
                 >
                 <span>Change Photo</span>
                 </CldUploadButton>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input label="name" id="name" type="text" register={register} errors={errors} />
                    <Button disabled={loading} type="submit" >Save</Button>
                </form>
            </div>
        </Modal>
    );
};

export default ProfileSetting;