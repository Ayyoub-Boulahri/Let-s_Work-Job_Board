import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Divider } from "@nextui-org/react";
import { RiListSettingsLine } from "react-icons/ri";
import { Select, SelectItem, Input, Textarea } from "@nextui-org/react";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { addEmployeeExperience } from "../../services/employeeServices";
import { useSelector } from "react-redux";

export default function ExperiencePopup(props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const authInfo = useSelector((state) => state.isAuthenticated.value);

    const [newExperience, setNewExperience] = useState({
        company: '',
        title: '',
        date_debut: '',
        date_fin: '',
        description: '',
    });

    const handleInputChange = (field, value) => {
        let formattedDate = value;

        if (/^\d{4}-\d{2}$/.test(value)) {
            const [year, month] = value.split("-");
            const date = new Date(`${year}-${month}-01`);
            formattedDate = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        }

        setNewExperience(prevState => ({
            ...prevState,
            [field]: formattedDate,
        }));
    };

    const handleAddExperience = async (onClose) => {
        const filledFields = Object.keys(newExperience).filter((key) => newExperience[key] !== '');
        const experienceToAdd = {};

        filledFields.forEach((field) => {
            experienceToAdd[field] = newExperience[field];
        });

        if (Object.keys(experienceToAdd).length > 1 && experienceToAdd?.company && experienceToAdd?.title) {
            const response = await addEmployeeExperience(authInfo?.userId, experienceToAdd)
            if (response.status === 200) {
                props.addExperience(experienceToAdd)
                onClose()
            }
        }
    };

    return (
        <>
            <button onClick={onOpen}><MdOutlinePlaylistAdd size={25} className="cursor-pointer hover:text-default-500 duration-300" /></button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={"inside"}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-[20px]">New degree</ModalHeader>
                            <ModalBody className="popupModel">
                                <div className="flex flex-col gap-2">
                                    <Input type="text" variant='flat' label="Company" labelPlacement="outside" placeholder="Enter the company name" onChange={(e) => handleInputChange('company', e.target.value)} />
                                    <Input type="text" variant='flat' label="Title" labelPlacement="outside" placeholder="Enter the job title" onChange={(e) => handleInputChange('title', e.target.value)} />
                                    <div className="flex gap-6">
                                        <Input type="month" variant='underlined' label="Start Date" placeholder=" " onChange={(e) => handleInputChange('date_debut', e.target.value)} />
                                        <Input type="month" variant='underlined' label="End Date" placeholder=" " onChange={(e) => handleInputChange('date_fin', e.target.value)} />
                                    </div>
                                    <Textarea
                                        label="Description"
                                        labelPlacement="outside"
                                        placeholder="Enter your description"
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                    />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    cancel
                                </Button>
                                <Button color="primary" onPress={() => handleAddExperience(onClose)}>
                                    Add
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
