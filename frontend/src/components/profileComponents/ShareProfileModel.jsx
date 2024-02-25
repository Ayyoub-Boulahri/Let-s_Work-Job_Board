import React from 'react'
import { HiShare } from "react-icons/hi";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { BiSolidCopyAlt } from "react-icons/bi";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ShareProfileModel(props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const profileLink = "http://localhost:5173/profiles/profile/" + props.userId;
    const handleCopyText = () => {
        navigator.clipboard.writeText(profileLink).then(() => {
            toast.success('Profile link Copied', {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        })
            .catch((error) => {
                console.error('Error copying text:', error);
                // Handle error if text copying fails
            });
    };
    return (
        <>
            <HiShare size={30} onClick={onOpen} className='cursor-pointer text-primary' />
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={"inside"}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-[20px]">My Profile Link</ModalHeader>
                            <ModalBody className="popupModel">
                                <div className='flex gap-4 items-center'>
                                    <Input readOnly size='sm' value={profileLink} />
                                    <BiSolidCopyAlt size={30} onClick={handleCopyText} className='cursor-pointer text-default-500 hover:text-default-600 duration-300' />
                                </div>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <ToastContainer className="z-[100000]"/>
        </>
    )
}

export default ShareProfileModel