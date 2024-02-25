import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Divider } from "@nextui-org/react";
import { MdWork } from "react-icons/md";
import { convertBase64ToUrlFile, fileToBase64 } from "../../services/convertFunctions";
import { addPostulation, getEmployeePostulation, updateEmployeePostulation } from "../../services/jobOfferServices";
import { useSelector } from "react-redux";
import { LuRefreshCw } from "react-icons/lu";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ApplyPopUp(props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [attachedFiles, setAttachedFiles] = useState([])
    const authInfo = useSelector((state) => state.isAuthenticated.value);
    const [postulation, setPostulation] = useState(null)

    const handleFileChange = async (event, attachment) => {
        const file = event.target.files[0];

        if (file) {
            try {
                const formData = new FormData();
                formData.append('file', file);
                const base64String = await fileToBase64(file);
                let found = false;
                const newAttachements = attachedFiles.map((attachedFile) => {
                    if (attachedFile.name === attachment) {
                        found = true;
                        return { ...attachedFile, file: base64String }
                    }
                    return attachedFile;
                })

                setAttachedFiles(newAttachements)

                if (!found) {
                    setAttachedFiles((prev) => [...prev, { name: attachment, file: base64String }]);
                }

            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    const getPostulation = async () => {
        const response = await getEmployeePostulation(props.jobId, authInfo?.userId);
        if (response.status === 200) {
            setPostulation(response.data.postulations[0].postulations[0].attachements[0].file)
        }
    }

    useEffect(() => {

        getPostulation()
    }, [])

    const handleApplying = async (onClose) => {
        if (attachedFiles.length === props.attachements.length) {
            const response = postulation ? await updateEmployeePostulation(props.jobId, authInfo?.userId, attachedFiles) : await addPostulation(props.jobId, authInfo?.userId, attachedFiles)
            if (response.status === 200) {
                getPostulation()
                handleClosing(onClose)
                toast.success('you have applied successfully', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }
        }
    }

    const handleClosing = (onClose) => {
        onClose();
        setAttachedFiles([])
    }

    return (
        <div>
            <Button onClick={onOpen} radius="sm" color={postulation ? "danger" : "primary"} className='w-full font-bold text-[18px]'>
                {postulation
                    ? <><LuRefreshCw /> ReApply</>
                    : <><MdWork /> Apply</>
                }
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
                                                onChange={(e) => handleFileChange(e, attach)}
                                                className="text-gray-300 p-2 rounded-md"
                                            />
                                        </div>
                                        {index != props.attachements.length - 1 && <Divider className="mt-4" />}
                                    </div>
                                ))}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={() => handleClosing(onClose)}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={() => handleApplying(onClose)}>
                                    Apply
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <ToastContainer />
        </div>
    );
}

export default ApplyPopUp;
