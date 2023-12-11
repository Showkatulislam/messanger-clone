"use client";

import Select from "@/app/components/inputs/Select";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface groupModalprops {
  isOpen?: boolean;
  closeModal: () => void;
  users:User[]
}
const GroupModel: React.FC<groupModalprops> = ({ isOpen, closeModal ,users}) => {
  const router = useRouter();
  const [isloading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const members=watch("members")
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);

    axios
      .post("/api/conversations", {
        ...data,
        isGroup: true,
      })
      .then(() => {
        router.refresh();
        closeModal();
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 
              className="
                text-base 
                font-semibold 
                leading-7 
                text-gray-900
              "
              >
                Create a group chat
              </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Create a chat with more than 2 people.
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                disabled={isloading}
                label="Name" 
                id="name" 
                errors={errors} 
                required 
                type="text"
                register={register}
              />
              <Select
                disabled={isloading}
                label="Members" 
                options={users.map((user) => ({ 
                  value: user.id, 
                  label: user.name 
                }))} 
                onChange={(value) => setValue('members', value, { 
                  shouldValidate: true 
                })} 
                value={members}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button
            disabled={isloading}
            onClick={closeModal} 
            type="button"
            secondary
          >
            Cancel
          </Button>
          <Button disabled={isloading} type="submit">
            Create
          </Button>
        </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default GroupModel;
