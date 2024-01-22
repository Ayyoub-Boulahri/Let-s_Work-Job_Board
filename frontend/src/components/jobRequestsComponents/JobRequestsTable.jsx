import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip } from "@nextui-org/react";
import { EditIcon } from "../UIComponents/EditIcon";
import { DeleteIcon } from "../UIComponents/DeleteIcon";
import { EyeIcon } from "../UIComponents/EyeIcon";


function JobRequestsTable(props) {

    const statusColorMap = {
        "Accept": "success",
        "rejected": "danger",
        "in progress": "warning",
    };
    const headerColumns = ["Company", "Job Title", "date applyment", "Status", "Actions"]

    return (
        <Table aria-label="Example table with custom cells">
            <TableHeader>
                {
                    headerColumns.map((headerColumn, index) => (
                        <TableColumn key={index} align={headerColumn === "Actions" ? "center" : "start"}>
                            {headerColumn}
                        </TableColumn>
                    ))
                }
            </TableHeader>
            <TableBody>
                {
                    props.jobOffers.map((jobOffer) => (
                        <TableRow key={jobOffer.id}>
                            <TableCell>
                                <User
                                    avatarProps={{ radius: "lg", src: jobOffer.photo }}
                                    description={jobOffer.city + " (" + jobOffer.country + ")"}
                                    name={jobOffer.companyName}
                                    className="cursor-pointer"
                                    onClick={() => {window.location.href = "/companies/company/" + jobOffer.id}}
                                />
                            </TableCell>
                            <TableCell><span className="hover:text-rose-500 duration-200 cursor-pointer" onClick={() => { window.location.href = "/jobs/job/" + jobOffer.id }}>{jobOffer.title}</span></TableCell>
                            <TableCell className="text-default-500 font-semibold">{jobOffer.date_applayment}</TableCell>
                            <TableCell>
                                <Chip className="capitalize" color={statusColorMap[jobOffer.status]} size="sm" variant="flat">
                                    {jobOffer.status}
                                </Chip>
                            </TableCell>
                            <TableCell>
                                <div className="relative flex items-center gap-2">
                                    <Tooltip content="Details">
                                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                            <EyeIcon />
                                        </span>
                                    </Tooltip>
                                    <Tooltip content="edit attachements">
                                        <span className="text-lg text-primary-400 cursor-pointer active:opacity-50">
                                            <EditIcon />
                                        </span>
                                    </Tooltip>
                                    <Tooltip color="danger" content="Delete request">
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
    );
}

export default JobRequestsTable