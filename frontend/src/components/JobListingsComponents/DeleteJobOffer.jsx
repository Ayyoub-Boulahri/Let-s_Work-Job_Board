import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Tooltip } from "@nextui-org/react";
import { DeleteIcon } from "../UIComponents/DeleteIcon";
import { deleteJobOffer } from '../../services/jobOfferServices';

function DeleteJobOffer(props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const removePostulation = async (onClose) => {
        const result = await deleteJobOffer(props.jobOfferId)
        if (result) {
            props.setIsModified(true)
            onClose()
        }
        props.setIsModified(false)
    }
    return (
        <>
            <Tooltip color="danger" content="Delete Job">
                <span onClick={onOpen} className="text-lg text-danger cursor-pointer active:opacity-50">
                    <DeleteIcon />
                </span>
            </Tooltip >

            <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={"inside"} className="md:mb-0 mb-[10%]">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-[20px]">Upload Attachments</ModalHeader>
                            <ModalBody className="popupModel">
                                Are you sure you want to delete this Job Offer ?
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    cancel
                                </Button>
                                <Button color="primary" onPress={() => removePostulation(onClose)}>
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

export default DeleteJobOffer