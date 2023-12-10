'use client'
import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react';
import { BsBackspaceFill } from 'react-icons/bs';


interface modelProps{
    isOpen?:boolean;
    closeModal:()=>void,
    children:React.ReactNode
}
const Modal:React.FC<modelProps> = ({isOpen,closeModal,children}) => {
    return (
        <Transition.Root show={isOpen} >
          <Dialog onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25 " />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                 <div className='flex flex-col gap-4'>
                  <div className="flex justify-end">
                  <button className=' text-red-600 border-0 outline-none' onClick={closeModal}>
                    <BsBackspaceFill size={28}/>
                    </button>
                  </div>
                  <div>
                    {children}
                  </div>
                 </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
          </Dialog>
        </Transition.Root>
    );
};

export default Modal;