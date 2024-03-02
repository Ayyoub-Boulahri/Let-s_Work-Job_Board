import React, { useEffect, useState } from 'react'
import { CSVLink } from 'react-csv';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { getJobOfferPostulationsTotal, getPostulations } from '../../services/jobOfferServices';
function DownloadPostulations(props) {
    const [postulations, setPostulations] = useState([])
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [condition, setCondition] = useState({})
    useEffect(() => {
        const fetchPostulations = async () => {
            try {
                const totalPostulations = await getJobOfferPostulationsTotal(props.jobOfferId, "");
                const postulations = await getPostulations(
                    props.jobOfferId,
                    {
                        _id: 0,
                        first_name: "$employee.first_name",
                        last_name: "$employee.last_name",
                        phone: "$employee.phone",
                        email: "$employee.email",
                        city: "$employee.city",
                        country: "$employee.country",
                        date_of_birth: "$employee.date_of_birth",
                        skills: "$employee.skills",
                        date_postulation: "$postulations.date_postulation",
                        status: "$postulations.status",
                    },
                    0, // skip
                    totalPostulations, // limit
                    "", // searchFilter
                    condition
                );
                setPostulations(postulations);
            } catch (error) {
                console.error("Error fetching postulations: ", error);
            }
        };

        fetchPostulations();
    }, [props.jobOfferId, condition]);

    const headers = [
        { label: 'APPLY AT', key: 'date_postulation' },
        { label: 'FIRST NAME', key: 'first_name' },
        { label: 'LAST NAME', key: 'last_name' },
        { label: 'EMAIL', key: 'email' },
        { label: 'PHONE', key: 'phone' },
        { label: 'CITY', key: 'city' },
        { label: 'COUNTRY', key: 'country' },
        { label: 'DATE OF BIRTH', key: 'date_of_birth' },
        { label: 'SKILLS', key: 'skills' },
        { label: 'Status', key: 'status' }
    ];

    const handleChange = (value) => {
        if (value == "all")
            setCondition({})
        else
            setCondition({ status: value })

    }

    const handleClick = () => {
        onOpen(); // Open the modal when the button is clicked
    };

    if (postulations.length === 0) {
        return (
            props.echecContent
        )
    }

    return (
        <div>
            {React.cloneElement(props.successContent, { onClick: handleClick })}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={"inside"}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-[20px]">Download Postulations List</ModalHeader>
                            <ModalBody className="popupModel">
                                <h3>What type of postulations you want to download ?</h3>
                                <select onChange={(e) => handleChange(e.target.value)} className='py-3 px-2 rounded-md'>
                                    <option value="all">All</option>
                                    <option value="Accept">Accept</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onPress={onClose}>
                                    Close
                                </Button>

                                <CSVLink data={postulations} filename={props.title + " list.csv"} headers={headers}>
                                    <Button color="primary">
                                        Download
                                    </Button>
                                </CSVLink>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default DownloadPostulations

