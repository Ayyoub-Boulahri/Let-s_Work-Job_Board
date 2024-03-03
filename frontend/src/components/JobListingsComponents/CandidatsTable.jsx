import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, Divider, Button, Input, Pagination } from "@nextui-org/react";
import { EditIcon } from "../UIComponents/EditIcon";
import { DeleteIcon } from "../UIComponents/DeleteIcon";
import { EyeIcon } from "../UIComponents/EyeIcon";
import { MdDownload } from "react-icons/md";
import InfiniteScroll from 'react-infinite-scroll-component'
import { changePostulationStatus, getPostulations } from "../../services/jobOfferServices";
import { convertBase64ToUrlFile, convertBufferToDataURL, formatDate } from "../../services/convertFunctions";
import { MdClear } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import JSZip from 'jszip';
import FileSaver from 'file-saver';

function CandidatsTable(props) {
    const [postulations, setPostulations] = useState([])
    const [selectedKeys, setSelectedKeys] = useState(null)
    const [isModified, setIsModified] = useState(1)
    const navigate = useNavigate()

    const statusColorMap = {
        "Accept": "success",
        "Rejected": "danger",
        "In Progress": "warning",
    };

    const headerColumns = ["Candidat", "Status", "Apply At", "country", "City", "Phone", "Resume", "Attachments", "Skills"]
    useEffect(() => {
        getCandidats()
    }, [isModified, props.currentPage, props.searchText])


    const downloadAttachmentsAsZip = async (first_name, last_name, attachments) => {
        try {
            const zip = new JSZip();

            // Assuming attachments is an array of objects with file names and content
            attachments.forEach(attachment => {
                // Decode base64 content to binary data
                const binaryData = atob(attachment.file);
                // Create a Uint8Array from binary data
                const arrayBuffer = new Uint8Array(binaryData.length);
                for (let i = 0; i < binaryData.length; i++) {
                    arrayBuffer[i] = binaryData.charCodeAt(i);
                }
                // Create Blob from Uint8Array
                const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
                // Add file to zip
                zip.file(first_name + "_" + last_name + "_" + attachment.name + ".pdf", blob);
            });

            const zipBlob = await zip.generateAsync({ type: "blob" }); // Generate zip as blob

            FileSaver.saveAs(zipBlob, first_name + "_" + last_name + "_attachments.zip"); // Save zip file

        } catch (error) {
            console.error("Error creating zip file: ", error);
        }
    };

    const getCandidats = async () => {
        getPostulations(props.jobOfferId, {
            _id: 0,
            employee_id: "$employee._id",
            first_name: "$employee.first_name",
            last_name: "$employee.last_name",
            phone: "$employee.phone",
            email: "$employee.email",
            city: "$employee.city",
            profilePhoto: "$employee.profilePhoto",
            country: "$employee.country",
            date_of_birth: "$employee.date_of_birth",
            skills: "$employee.skills",
            cv: "$employee.cv",
            attachments: "$postulations.attachements",
            date_postulation: "$postulations.date_postulation",
            candidat_status: "$postulations.status"
        }, (props.currentPage - 1) * props.postulationPerPage, props.postulationPerPage, props.searchText, {})
            .then((postulations) => {
                setPostulations(postulations)
            })
            .catch(() => setPostulations([]))
    }

    const changeStatusPostulations = async (status) => {
        if (selectedKeys) {
            const keys = selectedKeys != "all" ? [...selectedKeys] : "all"
            changePostulationStatus(props.jobOfferId, status, keys)
            setIsModified(prev => !prev)
        }
    }
    const classNames = React.useMemo(
        () => ({
            wrapper: ["max-h-[382px]", "max-w-3xl"],
            th: ["text-default-500", "border-b", "border-divider"],
            td: [
                // changing the rows border radius
                // first
                "group-data-[first=true]:first:before:rounded-none",
                "group-data-[first=true]:last:before:rounded-none",
                // middle
                "group-data-[middle=true]:before:rounded-none",
                // last
                "group-data-[last=true]:first:before:rounded-none",
                "group-data-[last=true]:last:before:rounded-none",
            ],
        }),
        [],
    );


    if (postulations.length === 0 && !props.searchText) {
        return (
            <div className='flex justify-center mt-10'>
                You don't have any Postultions Yet
            </div>
        )
    }



    return (
        <Table
            aria-label="Candidats Table"
            onSelectionChange={setSelectedKeys}
            selectionMode="multiple"
            style={{ minWidth: "1400px" }}
            classNames={classNames}
            topContentPlacement="outside"
            removeWrapper
            topContent={
                <div className="flex justify-between">
                    <div className="flex w-[80%] items-center justify-start">
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
                                    <MdClear className="cursor-pointer" onClick={() => props.setSearchText("")} />
                                }
                                value={props.searchText}
                                onChange={(e) => props.setSearchText(e.target.value)}
                            />
                        </div>
                    </div>
                    {
                        (selectedKeys != null && selectedKeys?.size != 0) &&
                        <div className="flex justify-end gap-4">
                            <Button color="danger" size="sm" onClick={() => changeStatusPostulations("Rejected")}>
                                Reject
                            </Button>
                            <Button color="success" size="sm" onClick={() => changeStatusPostulations("Accept")}>
                                Accept
                            </Button>
                        </div>
                    }
                </div>
            }
        >
            <TableHeader>
                {
                    headerColumns.map((headerColumn, index) => (
                        <TableColumn key={index} >
                            {headerColumn}
                        </TableColumn>
                    ))
                }
            </TableHeader>
            <TableBody>
                {
                    postulations.map((postulation) => (
                        <TableRow key={postulation.employee_id} className="border-b border-default-100">
                            <TableCell>
                                <User
                                    onClick={() => navigate("/profiles/profile/" + postulation.employee_id)}
                                    avatarProps={{ radius: "lg", src: convertBufferToDataURL(postulation.profilePhoto) }}
                                    description={postulation.email}
                                    name={postulation.first_name + " " + postulation.last_name}
                                    className="cursor-pointer" />
                            </TableCell>
                            <TableCell>
                                <Chip className="capitalize" color={statusColorMap[postulation.candidat_status]} size="sm" variant="flat">
                                    {postulation.candidat_status}
                                </Chip>
                            </TableCell>
                            <TableCell className="text-default-500">{formatDate(postulation.date_postulation)}</TableCell>
                            <TableCell>{postulation.country}</TableCell>
                            <TableCell>{postulation.city}</TableCell>
                            <TableCell>{postulation.phone}</TableCell>
                            <TableCell>
                                <a href={convertBase64ToUrlFile(postulation.cv)} download={postulation.first_name + "_" + postulation.last_name + "_cv"}>
                                    <span className="text-small text-default-400 cursor-pointer font-bold active:opacity-50 hover:text-green-600 duration-300">
                                        Download
                                    </span>
                                </a>
                            </TableCell>
                            <TableCell>
                                <span className="text-small text-default-400 cursor-pointer font-bold active:opacity-50 hover:text-green-600 duration-300"
                                    onClick={() => downloadAttachmentsAsZip(postulation.first_name, postulation.last_name, postulation.attachments)}
                                >
                                    Download
                                </span>
                            </TableCell>
                            <TableCell className="w-[300px]">
                                {postulation.skills.map((skill, index) => (
                                    index === postulation.skills.length - 1 ? skill : skill + " - "
                                ))}
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}

export default CandidatsTable