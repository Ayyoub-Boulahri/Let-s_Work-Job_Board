import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { DeleteIcon } from "../UIComponents/DeleteIcon";
import { deleteRequest } from '../../services/RequestsServices';

function DeleteRequestModel(props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const removeRequest = async (onClose) => {
        deleteRequest(props.companyId)  
        props.setDeleted(prev => !prev)
        onClose()
    }
    return (
        <>
            <span onClick={onOpen} className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
            </span>
            <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={"inside"} className="md:mb-0 mb-[10%]">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-[20px]">Upload Attachments</ModalHeader>
                            <ModalBody className="popupModel">
                                Are you sure you want to remove your this request ?
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    cancel
                                </Button>
                                <Button color="primary" onPress={() => removeRequest(onClose)}>
                                    Yes
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default DeleteRequestModel