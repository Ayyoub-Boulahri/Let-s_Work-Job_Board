import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip } from "@nextui-org/react";
import { EditIcon } from "../UIComponents/EditIcon";
import { DeleteIcon } from "../UIComponents/DeleteIcon";
import { MdDownload } from "react-icons/md";
import CandidatPopUp from "./CandidatPopUp";
import { useNavigate } from "react-router-dom";

function JobListsTable(props) {

    const statusColorMap = {
        "Open": "success",
        "close": "danger",
    };

    const navigate = useNavigate()

    const headerColumns = ["Job Title", "Posted on", "Deadline", "total condidat", "Status", "Download List", "Actions"]

    return (
        <Table aria-label="Example table with custom cells">
            <TableHeader>
                {
                    headerColumns.map((headerColumn, index) => (
                        <TableColumn key={index} className={`${headerColumn == "Download List" ? "flex justify-center items-center max-w-18" : ""}`}>
                            {headerColumn}
                        </TableColumn>
                    ))
                }
            </TableHeader>
            <TableBody>
                {
                    props.jobOffers.map((jobOffer) => (
                        <TableRow key={jobOffer.id}>
                            <TableCell><span className="hover:text-rose-500 duration-200 cursor-pointer" onClick={() => navigate("/jobs/job/65c8ba120e171b8929074d3a" )}>{jobOffer.title}</span></TableCell>
                            <TableCell className="text-default-500">{jobOffer.date_poste}</TableCell>
                            <TableCell className="text-default-500">{jobOffer.Deadline}</TableCell>
                            <TableCell>{jobOffer.nbCondidat}</TableCell>
                            <TableCell>
                                <Chip className="capitalize" color={statusColorMap[jobOffer.status]} size="sm" variant="flat">
                                    {jobOffer.status}
                                </Chip>
                            </TableCell>
                            <TableCell align="center">
                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50 flex justify-center">
                                    <MdDownload size={22} className="hover:text-green-600 duration-300"/> 
                                </span>
                            </TableCell>
                            <TableCell>
                                <div className="relative flex items-center gap-2">
                                    {/* <Tooltip content="Details">
                                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                            <EyeIcon />
                                        </span>
                                    </Tooltip> */}
                                    <CandidatPopUp />
                                    <Tooltip content="edit Job">
                                        <span className="text-lg text-primary-400 cursor-pointer active:opacity-50">
                                            <EditIcon />
                                        </span>
                                    </Tooltip>
                                    <Tooltip color="danger" content="Delete Job">
                                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                            <DeleteIcon />
                                        </span>
                                    </Tooltip>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}

export default JobListsTable