import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { FaFile } from "react-icons/fa6";
import { convertBase64ToUrlFile } from '../../services/convertFunctions';



function CvModel(props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <h1 onClick={onOpen} className='font-semibold text-primary-400 text-center flex underline gap-2 text-[20px] cursor-pointer items-center mt-2'>
                <FaFile size={22} />
            </h1>
            <Modal isOpen={isOpen} placement='center' size="lg" onOpenChange={onOpenChange} scrollBehavior={"inside"}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-[20px]">{props.first_name + " " + props.last_name + " CV"}</ModalHeader>
                            <ModalBody className="popupModel">
                                <div className='flex gap-4 items-center'>
                                    <iframe src={convertBase64ToUrlFile(props.cv)} className='w-full h-screen sm:flex hidden'/>
                                </div>

                            </ModalBody>
                            <ModalFooter>
                                <Button variant='light' color="danger" onPress={onClose}>
                                    Close
                                </Button>
                                <a href={convertBase64ToUrlFile(props.cv)} download={props.first_name + "_" + props.last_name + "_CV"}>
                                    <Button color="primary">
                                        Download Cv
                                    </Button>
                                </a>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </>
    )
}

export default CvModel