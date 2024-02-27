import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip } from "@nextui-org/react";
import { EditIcon } from "../UIComponents/EditIcon";
import { DeleteIcon } from "../UIComponents/DeleteIcon";
import { MdDownload } from "react-icons/md";
import CandidatPopUp from "./CandidatPopUp";
import { useNavigate } from "react-router-dom";
import { getCompanyJobOffersCount, getSomeCompanyJobOffers, getTotalOpenJobOffers } from "../../services/jobOfferServices";
import { useSelector } from "react-redux";
import { formatDate } from "../../services/convertFunctions";
import { Pagination } from "@nextui-org/react";

function JobListsTable(props) {
    const authInfo = useSelector((state) => state.isAuthenticated.value);
    const [jobListings, setJobListings] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1)
    const jobListingPerTime = 5

    const statusColorMap = {
        "Open": "success",
        "Close": "danger",
    };

    const navigate = useNavigate()

    const headerColumns = ["Job Title", "Posted on", "Deadline", "total condidat", "Status", "Download List", "Actions"]

    useEffect(() => {

        const getTotalJobs = async () => {
            try {
                getCompanyJobOffersCount(authInfo?.userId, {company: authInfo?.userId}).then(response => {
                    setTotalPages(Math.ceil(response / jobListingPerTime))
                }).catch(error => {
                    console.error(error);
                });
            } catch (error) {
                console.error(error)
            }
        }

        getTotalJobs()
        getJobOffers()

    }, [authInfo, currentPage])

    const getJobOffers = async () => {
        try {
            getSomeCompanyJobOffers(
                authInfo?.userId,
                {
                    "_id": 1,
                    "title": 1,
                    "date_publication": 1,
                    "delais_depot": 1,
                    "job_status": 1,
                }, (currentPage - 1) * jobListingPerTime, jobListingPerTime, {company: authInfo?.userId}).then(response => {
                    setJobListings(response)
                }).catch(error => {
                    console.error(error);
                });
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
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
                        jobListings?.map((jobOffer) => (
                            <TableRow key={jobOffer._id}>
                                <TableCell><span className="hover:text-rose-500 duration-200 cursor-pointer" onClick={() => navigate("/jobs/job/" + jobOffer._id)}>{jobOffer.title}</span></TableCell>
                                <TableCell className="text-default-500">{formatDate(jobOffer.date_publication)}</TableCell>
                                <TableCell className="text-default-500">{formatDate(jobOffer.delais_depot)}</TableCell>
                                <TableCell>15</TableCell>
                                <TableCell>
                                    <Chip className="capitalize" color={jobOffer.job_status ? "success" : "danger"} size="sm" variant="flat">
                                        {jobOffer.job_status ? "Open" : "Closed"}
                                    </Chip>
                                </TableCell>
                                <TableCell align="center">
                                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50 flex justify-center">
                                        <MdDownload size={22} className="hover:text-green-600 duration-300" />
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
            <div className='flex justify-center mt-6'>
                <Pagination showControls total={totalPages} initialPage={1} page={currentPage} onChange={setCurrentPage} />
            </div>
        </>
    )
}

export default JobListsTable