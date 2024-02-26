import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, Button } from "@nextui-org/react";
import { EditIcon } from "../UIComponents/EditIcon";
import { EyeIcon } from "../UIComponents/EyeIcon";
import { getEmployeeJobRequests, getEmployeeJobRequestsCount } from "../../services/jobOfferServices";
import { useSelector } from "react-redux";
import { convertBufferToDataURL, formatDate } from "../../services/convertFunctions";
import { Pagination } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import DeletePostulationModel from "./DeletePostulationModel";

function JobRequestsTable(props) {

    const statusColorMap = {
        "Accept": "success",
        "Rejected": "danger",
        "In Progress": "warning",
    };


    const headerColumns = ["Company", "Job Title", "Job Status", "Apply At", "Status", "Actions"]
    const authInfo = useSelector((state) => state.isAuthenticated.value);
    const [hasMore, setHasMore] = useState(true)
    const [jobRequests, setJobRequests] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1)
    const [searchText, setSearchText] = useState("")
    const [isModified, setIsModified] = useState(false)
    const navigate = useNavigate()
    const jobRequestsPerTime = 2

    useEffect(() => {

        getTotalJobRequests()
        getMoreJobRequests()
    }, [authInfo, currentPage, searchText, isModified])

    const getMoreJobRequests = async () => {
        getEmployeeJobRequests(authInfo?.userId, ((currentPage - 1) * jobRequestsPerTime), jobRequestsPerTime, props.condition, searchText)
            .then((response) => setJobRequests(response))
            .catch((response) => setJobRequests([]))
    }

    const getTotalJobRequests = async () => {
        getEmployeeJobRequestsCount(authInfo?.userId, props.condition, searchText)
            .then((response) => setTotalPages(Math.ceil(response / jobRequestsPerTime)))

    }

    if (jobRequests.length === 0 && !searchText) {
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
                        isClearable
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
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
            </div>

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
                        jobRequests?.map((jobRequest) => (
                            <TableRow key={jobRequest._id}>
                                <TableCell className="min-w-[250px]">
                                    <User
                                        avatarProps={{ radius: "lg", src: convertBufferToDataURL(jobRequest.company.company_photo) }}
                                        description={jobRequest.company.city + " (" + jobRequest.company.country + ")"}
                                        name={jobRequest.company.company_name}
                                        className="cursor-pointer"
                                        onClick={() => navigate("/companies/company/" + jobRequest.company._id)}
                                    />
                                </TableCell>
                                <TableCell><span className="hover:text-rose-500 duration-200 cursor-pointer" onClick={() => navigate("/jobs/job/" + jobRequest._id)}>{jobRequest.title}</span></TableCell>
                                <TableCell>
                                    <Chip className="capitalize" color={jobRequest.job_status ? "success" : "danger"} size="sm" variant="flat">
                                        {jobRequest.job_status ? "Open" : "Closed"}
                                    </Chip>
                                </TableCell>
                                <TableCell className="text-default-500">{formatDate(jobRequest.date_postulation)}</TableCell>
                                <TableCell>
                                    <Chip className="capitalize" color={statusColorMap[jobRequest.Offer_status]} size="sm" variant="flat">
                                        {jobRequest.Offer_status}
                                    </Chip>
                                </TableCell>
                                <TableCell>
                                    <div className="relative flex items-center gap-2">
                                        <Tooltip content="Details">
                                            <span onClick={() => navigate("/jobs/job/" + jobRequest._id)} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                <EyeIcon />
                                            </span>
                                        </Tooltip>
                                        {/* <Tooltip content="edit attachements">
                                            <span className="text-lg text-primary-400 cursor-pointer active:opacity-50">
                                                <EditIcon />
                                            </span>
                                        </Tooltip> */}
                                        <Tooltip color="danger" content="remove applyment">
                                            <DeletePostulationModel jobOfferId={jobRequest._id} employeeId={authInfo?.userId} setIsModified={setIsModified}/>
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

    );
}

export default JobRequestsTable