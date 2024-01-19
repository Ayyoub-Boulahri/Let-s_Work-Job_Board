import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Divider } from "@nextui-org/react";
import { MdWork } from "react-icons/md";

function ApplyPopUp(props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleFileChange = (event) => {
        // Handle file changes here
        const selectedFile = event.target.files[0];
        console.log("Selected File:", selectedFile);
    };

    return (
        <div>
            <Button onClick={onOpen} radius="sm" color="primary" className='w-full font-bold text-[18px]'>
                <MdWork /> Apply for the job
            </Button>
            <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={"inside"} className="md:mb-0 mb-[10%]">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-[20px]">Upload Attachments</ModalHeader>
                            <ModalBody className="popupModel">
                                <Divider />

                                {props.attachements.map((attach, index) => (
                                    <div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="fileInput" className="text-[18px] text-default-400 font-bold">
                                                {attach}
                                            </label>
                                            <input
                                                type="file"
                                                id="fileInput"
                                                name="fileInput"
                                                onChange={handleFileChange}
                                                className="text-gray-300 p-2 rounded-md"
                                            />
                                        </div>
                                        {index != props.attachements.length - 1 && <Divider className="mt-4"/>}
                                    </div>
                                ))}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Apply
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}

export default ApplyPopUp;
