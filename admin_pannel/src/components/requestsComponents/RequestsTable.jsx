import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, Button } from "@nextui-org/react";
import { convertBufferToDataURL, formatDate } from "../../services/convertFunctions";
import { MdPageview } from "react-icons/md";
import { Pagination } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { MdClear } from "react-icons/md";
import { getSomeCompanies,getTotalRequests,updateCompanyInfos } from "../../services/RequestsServices";
import CvModel from "./CvModel";

import { FaUserCheck } from "react-icons/fa";

function RequestsTable(props) {

    const statusColorMap = {
        "Accept": "success",
        "Rejected": "danger",
        "In Progress": "warning",
    };


    const headerColumns = ["company", "country", "city", "certificat", "approuve", "Actions"]
    const [companies, setCompanies] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1)
    const [searchText, setSearchText] = useState("")
    const [isAccepted,setIsAccepted] = useState(false);
    const navigate = useNavigate()
    const companiesPerTime = 4

    useEffect(() => {
        getTotalCompanies()
        getMoreCompanies()
    }, [ currentPage, searchText, isAccepted])

    const handleAccept = async (_id) => {
        try {
            const response = await updateCompanyInfos(_id, { isApproved: true });
            console.log(response.data); 
            setIsAccepted((prev)=>!prev);
        } catch (error) {
            console.error("Error accepting company:", error);
        }
    };

    const getMoreCompanies = async () => {
        getSomeCompanies({},((currentPage - 1) * companiesPerTime),companiesPerTime,searchText,{"isApproved":false})
            .then((response) => setCompanies(response))
            .catch((response) => setCompanies([]))
    }

    const getTotalCompanies = async () => {
        getTotalRequests(searchText,{"isApproved":false})
            .then((response) => setTotalPages(Math.ceil(response / companiesPerTime)))

    }

    if (companies.length === 0 && !searchText) {
        return (
            <div className='flex justify-center mt-10'>
                There's no companies requests yet
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
                        endContent={
                            <MdClear className="cursor-pointer" onClick={() => setSearchText("")} />
                        }
                        value={searchText}
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
                        companies?.map((company) => (
                            <TableRow key={company._id}>
                                <TableCell className="min-w-[250px] flex">
                                    <User
                                        avatarProps={{ radius: "lg", src: convertBufferToDataURL(company.company_photo) }}
                                        name={company.company_name}
                                        description="tst"
                                        className="cursor-pointer"
                                        onClick={() => navigate("/companies/company/" + company.company._id)}
                                    />
                                </TableCell>
                                <TableCell> 
                                    <span className="flex p-2" >{company.country}</span>
                                </TableCell>
                                <TableCell>
                                    <span className="flex p-2" >{company.city}</span>
                                </TableCell>
                                <TableCell className="text-default-500">
                                    <CvModel cv={company.certificat.file}></CvModel>
                                </TableCell>
                                <TableCell>
                                    <div>

                                        <FaUserCheck color="green" size="22" onClick={() => handleAccept(company._id)} />
                                        
                                    </div>
                                </TableCell>
                                <TableCell>{/* 
                                    <div className="relative flex items-center gap-2">
                                        <Tooltip content="Details">
                                            <span onClick={() => navigate("/jobs/job/" + company._id)} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                <EyeIcon />
                                            </span>
                                        </Tooltip>
                                        {
                                            company.Offer_status != "Accept" && company.Offer_status != "Rejected"
                                            &&
                                            <Tooltip color="danger" content="remove applyment">
                                                <DeletePostulationModel jobOfferId={company._id} employeeId={authInfo?.userId} setIsModified={setIsModified} />
                                            </Tooltip>
                                        }
                                    </div>*/}
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

export default RequestsTable