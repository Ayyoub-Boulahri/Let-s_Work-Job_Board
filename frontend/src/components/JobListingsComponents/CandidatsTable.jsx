import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, Divider } from "@nextui-org/react";
import { EditIcon } from "../UIComponents/EditIcon";
import { DeleteIcon } from "../UIComponents/DeleteIcon";
import { EyeIcon } from "../UIComponents/EyeIcon";
import { MdDownload } from "react-icons/md";

function CandidatsTable(props) {
    const statusColorMap = {
        "Accept": "success",
        "rejected": "danger",
        "in progress": "warning",
    };
    const headerColumns = ["Candidat", "Apply At", "country", "City", "Phone", "Resume", "Attachments", "Skills", "Educations"]

    return (
        <Table aria-label="Example table with custom cells" style={{ minWidth: "2000px" }}>
            <TableHeader>
                {
                    headerColumns.map((headerColumn, index) => (
                        <TableColumn key={index} >
                            {headerColumn}
                        </TableColumn>
                    ))
                }
                <TableColumn className="w-[500px]">
                    Experiences
                </TableColumn>
            </TableHeader>
            <TableBody>
                {
                    props.candidats.map((candidat) => (
                            <TableRow key={candidat.id} className="border-b border-default-100">
                                <TableCell>
                                    <User
                                        avatarProps={{ radius: "lg", src: candidat.photo }}
                                        description={candidat.email}
                                        name={candidat.firstname + " " + candidat.lastname}
                                        className="cursor-pointer" />
                                </TableCell>
                                <TableCell className="text-default-500">{candidat.date_applayment}</TableCell>
                                <TableCell>{candidat.country}</TableCell>
                                <TableCell>{candidat.city}</TableCell>
                                <TableCell>{candidat.phone}</TableCell>
                                <TableCell>
                                    <span className="text-small text-default-400 cursor-pointer font-bold active:opacity-50 hover:text-green-600 duration-300">
                                        Download
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <span className="text-small text-default-400 cursor-pointer font-bold active:opacity-50 hover:text-green-600 duration-300">
                                        Download
                                    </span>
                                </TableCell>
                                <TableCell>
                                    {
                                        candidat.educations.map((education, index) => (
                                            <div key={index}>
                                                <span className="text-bold text-small capitalize block">{education.degree}</span>
                                                <span className="text-bold text-tiny capitalize text-default-500 block">{education.school}</span>
                                            </div>
                                        ))
                                    }
                            </TableCell>
                                <TableCell className="w-[300px]">
                                    {candidat.skills.map((skill, index) => (
                                        index === candidat.skills.length - 1 ? skill : skill + " - "
                                    ))}
                                </TableCell>
                                <TableCell className="w-[300px]">
                                    {candidat.experiences.map((experience, index) => (
                                        <span className="block">• &nbsp;&nbsp; {experience}</span>
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