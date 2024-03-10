import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip } from "@nextui-org/react";
import { EditIcon } from "../UIComponents/EditIcon";
import { DeleteIcon } from "../UIComponents/DeleteIcon";
import CandidatPopUp from "./CandidatPopUp";
import { useNavigate } from "react-router-dom";
import { getCompanyJobOffersCount, getSomeCompanyJobOffers } from "../../services/jobOfferServices";
import { useSelector } from "react-redux";
import { formatDate } from "../../services/convertFunctions";
import { Pagination } from "@nextui-org/react";
import DeleteJobOffer from "./DeleteJobOffer";
import DownloadPostulations from "./DownloadPostulations";
import { Input } from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import { MdClear } from "react-icons/md";
import { MdDownload } from "react-icons/md";
import { MdFileDownloadOff } from "react-icons/md";

function JobListsTable(props) {
    const authInfo = useSelector((state) => state.isAuthenticated.value);
    const [jobListings, setJobListings] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1)
    const [isModified, setIsModified] = useState(false)
    const [searchText, setSearchText] = useState("")

    const jobListingPerTime = 3

    const navigate = useNavigate()

    const headerColumns = ["Job Title", "Posted on", "Deadline", "total condidat", "Status", "Download List", "Actions"]

    useEffect(() => {
        console.log(isModified)
        const getTotalJobs = async () => {
            try {
                getCompanyJobOffersCount(authInfo?.userId, { company: authInfo?.userId, ...props.condition }, searchText).then(response => {
                    setTotalPages(Math.ceil(response / jobListingPerTime))
                }).catch(error => {
                    console.error(error);
                });
            } catch (error) {
                console.error(error)
            }
        }

        getJobOffers()
        getTotalJobs()

    }, [authInfo, currentPage, isModified, searchText])

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
                    "numberOfPostulations": 1
                }, (currentPage - 1) * jobListingPerTime, jobListingPerTime, props.condition, searchText)
                .then(response => {
                    setJobListings(response)
                    console.log(response)
                }).catch(error => {
                    setJobListings([])
                });
        } catch (error) {
            console.error(error)
        }
    }

    if (jobListings.length === 0 && !searchText) {
        return (
            <div className='flex justify-center mt-10'>
                You don't have any Job Requests Yet
            </div>
        )
    }

    return (
        <>
            <div className="flex w-[100%] items-center justify-end mb-6">
                <div className="md:w-[30%] w-[80%]">
                    <Input
                        label="Search"
                        radius="lg"
                        size="sm"
                        classNames={{
                            label: "text-black/50 dark:text-white/90",
                            input: [
                                "bg-transparent",
                                "text-black/90 dark:text-white/90",
                                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                            ],
                            innerWrapper: "bg-transparent",
                            inputWrapper: [
                                "shadow-xl",
                                "bg-default-200/50",
                                "dark:bg-default/60",
                                "backdrop-blur-xl",
                                "backdrop-saturate-200",
                                "hover:bg-default-200/70",
                                "dark:hover:bg-default/70",
                                "group-data-[focused=true]:bg-default-200/50",
                                "dark:group-data-[focused=true]:bg-default/60",
                                "!cursor-text",
                            ],
                        }}
                        placeholder="Type to search..."
                        startContent={
                            <CiSearch />
                        }
                        endContent={
                            <MdClear className="cursor-pointer" onClick={() => setSearchText("")} />
                        }
                        value={searchText}
                        onChange={(e) => { setCurrentPage(1); setSearchText(e.target.value) }}
                    />
                </div>
            </div>
            <Table aria-label="Job Listings Table">
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
                                <TableCell>{jobOffer.numberOfPostulations}</TableCell>
                                <TableCell>
                                    <Chip className="capitalize" color={jobOffer.job_status ? "success" : "danger"} size="sm" variant="flat">
                                        {jobOffer.job_status ? "Open" : "Closed"}
                                    </Chip>
                                </TableCell>
                                <TableCell align="center">
                                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50 flex justify-center">
                                        <DownloadPostulations
                                            jobOfferId={jobOffer._id}
                                            title={jobOffer.title}
                                            echecContent={
                                                <Tooltip color="danger" content="no Postulation Available">
                                                    <span className="text-lg text-danger-400 cursor-pointer active:opacity-50">
                                                        <MdFileDownloadOff />
                                                    </span>
                                                </Tooltip>
                                            }
                                            successContent={
                                                <MdDownload size={22} className="hover:text-green-600 duration-300" />
                                            }
                                        />
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <div className="relative flex items-center gap-2">
                                        <CandidatPopUp jobOfferId={jobOffer._id} title={jobOffer.title} numberOfPostulations={jobOffer.numberOfPostulations} />
                                        <Tooltip content="edit Job">
                                            <span onClick={() => navigate("/editJobOffer/" + jobOffer._id)} className="text-lg text-primary-400 cursor-pointer active:opacity-50">
                                                <EditIcon />
                                            </span>
                                        </Tooltip>

                                        <DeleteJobOffer
                                            jobOfferId={jobOffer._id}
                                            setIsModified={setIsModified}
                                            content={
                                                <Tooltip color="danger" content="Delete Job">
                                                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                                        <DeleteIcon />
                                                    </span>
                                                </Tooltip >
                                            }
                                        />
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