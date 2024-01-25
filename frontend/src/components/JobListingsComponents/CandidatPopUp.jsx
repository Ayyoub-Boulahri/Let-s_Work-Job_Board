import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Divider } from "@nextui-org/react";
import { RiListSettingsLine } from "react-icons/ri";
import { Select, Tooltip, SelectItem, Input, Switch } from "@nextui-org/react";
import { EyeIcon } from "../UIComponents/EyeIcon";
import JobListingsHeader from "./JobListingsHeader";
import { MdDownload } from "react-icons/md";
import candidat from "../../assets/candidat.jpg"
import candidat2 from "../../assets/candidat2.jpg"
import CandidatsTable from "./CandidatsTable";

function CandidatPopUp() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const candidats = [
        {
            id: 1,
            email: "john.doe@example.com",
            firstname: "John",
            lastname: "Doe",
            phone: "0612345678",
            birthdate: "1990-05-15",
            address: "123 Main Street",
            country: "United States",
            city: "Las Vegas",
            date_applayment: "12/01/2024",
            photo: candidat,
            cv_download: null,
            attch_download: null,
            experiences: [
                "Software Developer at Tech Solutions Inc. (2015-2020)",
                "Senior Developer at InnovateTech Ltd. (2021-present)"
            ],
            educations: [
                {
                    degree: "Bachelor of Science in Computer Science",
                    school: "University of Techville",
                    graduation_date: 2015
                }
            ],
            skills: ["JavaScript", "React", "Node.js", "HTML", "CSS", "Git"]
        },
        {
            id: 2,
            email: "john.doe@example.com",
            firstname: "ayyoub",
            lastname: "Boulahri",
            phone: "0615487523",
            birthdate: "2003-05-15",
            address: "123 Main Street",
            country: "Morocco",
            city: "Meknes",
            date_applayment: "19/01/2024",
            photo: candidat2,
            cv_download: null,
            attch_download: null,
            experiences: [
                "Lead Software Engineer at Cloud Innovations (2022-present)",
                "Software Developer at Tech Solutions Inc. (2015-2020)",
                "Senior Developer at InnovateTech Ltd. (2021)"
            ],
            educations: [
                {
                    degree: "Master of Science in Computer Science",
                    school: "University of Techville",
                    graduation_date: 2020
                }
            ],
            skills: [
                "JavaScript",
                "React",
                "Node.js",
                "HTML",
                "CSS",
                "Git",
                "Python",
                "Docker",
                "SQL",
                "MongoDB",
                "Vs code",
                "unity",
                ".net",
                "Microsoft Office",
            ]
        },
        {
            id: 1,
            email: "john.doe@example.com",
            firstname: "John",
            lastname: "Doe",
            phone: "0612345678",
            birthdate: "1990-05-15",
            address: "123 Main Street",
            country: "United States",
            city: "Las Vegas",
            date_applayment: "12/01/2024",
            photo: candidat,
            cv_download: null,
            attch_download: null,
            experiences: [
                "Software Developer at Tech Solutions Inc. (2015-2020)",
                "Senior Developer at InnovateTech Ltd. (2021-present)"
            ],
            educations: [
                {
                    degree: "Bachelor of Science in Computer Science",
                    school: "University of Techville",
                    graduation_date: 2015
                }
            ],
            skills: ["JavaScript", "React", "Node.js", "HTML", "CSS", "Git"]
        },
        {
            id: 2,
            email: "john.doe@example.com",
            firstname: "ayyoub",
            lastname: "Boulahri",
            phone: "0615487523",
            birthdate: "2003-05-15",
            address: "123 Main Street",
            country: "Morocco",
            city: "Meknes",
            date_applayment: "19/01/2024",
            photo: candidat2,
            cv_download: null,
            attch_download: null,
            experiences: [
                "Lead Software Engineer at Cloud Innovations (2022-present)",
                "Software Developer at Tech Solutions Inc. (2015-2020)",
                "Senior Developer at InnovateTech Ltd. (2021)"
            ],
            educations: [
                {
                    degree: "Master of Science in Computer Science",
                    school: "University of Techville",
                    graduation_date: 2020
                }
            ],
            skills: [
                "JavaScript",
                "React",
                "Node.js",
                "HTML",
                "CSS",
                "Git",
                "Python",
                "Docker",
                "SQL",
                "MongoDB",
                "Vs code",
                "unity",
                ".net",
                "Microsoft Office",
            ]
        },
        {
            id: 1,
            email: "john.doe@example.com",
            firstname: "John",
            lastname: "Doe",
            phone: "0612345678",
            birthdate: "1990-05-15",
            address: "123 Main Street",
            country: "United States",
            city: "Las Vegas",
            date_applayment: "12/01/2024",
            photo: candidat,
            cv_download: null,
            attch_download: null,
            experiences: [
                "Software Developer at Tech Solutions Inc. (2015-2020)",
                "Senior Developer at InnovateTech Ltd. (2021-present)"
            ],
            educations: [
                {
                    degree: "Bachelor of Science in Computer Science",
                    school: "University of Techville",
                    graduation_date: 2015
                }
            ],
            skills: ["JavaScript", "React", "Node.js", "HTML", "CSS", "Git"]
        },
        {
            id: 2,
            email: "john.doe@example.com",
            firstname: "ayyoub",
            lastname: "Boulahri",
            phone: "0615487523",
            birthdate: "2003-05-15",
            address: "123 Main Street",
            country: "Morocco",
            city: "Meknes",
            date_applayment: "19/01/2024",
            photo: candidat2,
            cv_download: null,
            attch_download: null,
            experiences: [
                "Lead Software Engineer at Cloud Innovations (2022-present)",
                "Software Developer at Tech Solutions Inc. (2015-2020)",
                "Senior Developer at InnovateTech Ltd. (2021)"
            ],
            educations: [
                {
                    degree: "Master of Science in Computer Science",
                    school: "University of Techville",
                    graduation_date: 2020
                }
            ],
            skills: [
                "JavaScript",
                "React",
                "Node.js",
                "HTML",
                "CSS",
                "Git",
                "Python",
                "Docker",
                "SQL",
                "MongoDB",
                "Vs code",
                "unity",
                ".net",
                "Microsoft Office",
            ]
        }
    ]
    return (
        <>
            <button onClick={onOpen}>
                <Tooltip content="Details">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                        <EyeIcon />
                    </span>
                </Tooltip>
            </button>
            <Modal isOpen={isOpen} size="5xl" onOpenChange={onOpenChange} scrollBehavior={"inside"}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-[20px]">Candidats List</ModalHeader>
                            <ModalBody className="popupModel">

                                <CandidatsTable candidats={candidats} />

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    <MdDownload size={20} /> Download CSV
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default CandidatPopUp