import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Divider, Pagination } from "@nextui-org/react";
import { RiListSettingsLine } from "react-icons/ri";
import { Select, Tooltip, SelectItem, Input, Switch } from "@nextui-org/react";
import { EyeIcon } from "../UIComponents/EyeIcon";
import JobListingsHeader from "./JobListingsHeader";
import { MdDownload } from "react-icons/md";
import candidat from "../../assets/candidat.jpg"
import candidat2 from "../../assets/candidat2.jpg"
import CandidatsTable from "./CandidatsTable";
import DownloadPostulations from "./DownloadPostulations";
import { MdFileDownloadOff } from "react-icons/md";
import { getJobOfferPostulationsTotal } from "../../services/jobOfferServices";

function CandidatPopUp(props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10)
    const [searchText, setSearchText] = useState("")

    const postulationPerPage = 4

    useEffect(() => {
        getTotalPostulations()
    }, [searchText])

    const getTotalPostulations = async () => {
        getJobOfferPostulationsTotal(props.jobOfferId, searchText)
            .then((response) => setTotalPages(Math.ceil(response / postulationPerPage)))
    }
    return (
        <>
            <button onClick={onOpen}>
                <Tooltip content="Details">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                        <EyeIcon />
                    </span>
                </Tooltip>
            </button>
            <Modal isOpen={isOpen} size="5xl" className="relative" placement="center" onOpenChange={onOpenChange} scrollBehavior={"inside"}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-[20px]">Candidats List</ModalHeader>
                            <ModalBody className="scrollbar-hide">
                                <CandidatsTable jobOfferId={props.jobOfferId} postulationPerPage={postulationPerPage} currentPage={currentPage} totalPages={totalPages} setTotalPages={setTotalPages} setSearchText={setSearchText} searchText={searchText} />
                            </ModalBody>

                            <ModalFooter className={`${props.numberOfPostulations != 0 && "flex justify-between"}`}>
                                {props.numberOfPostulations != 0 &&
                                    <Pagination
                                        showControls
                                        classNames={{
                                            cursor: "bg-foreground text-background",
                                        }}
                                        color="default"
                                        page={currentPage}
                                        total={totalPages}
                                        onChange={setCurrentPage}
                                        variant="light"
                                    />
                                }
                                <div className="flex gap-4">
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <DownloadPostulations
                                        jobOfferId={props.jobOfferId}
                                        title={props.title}
                                        echecContent={
                                            props.numberOfPostulations != 0 &&
                                            <Button color="danger">
                                                <MdFileDownloadOff size={20} /> no postulations
                                            </Button>
                                        }
                                        successContent={
                                            <Button color="primary" id="myButton">
                                                <MdDownload size={20} /> Download CSV
                                            </Button>
                                        }
                                    />
                                </div>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default CandidatPopUp