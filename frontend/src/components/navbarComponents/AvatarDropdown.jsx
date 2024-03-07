import React, { useEffect, useState } from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { deleteEmployeeById, getEmployeeByEmail } from '../../services/employeeServices';
import profile from "../../assets/profile.png"
import { convertBufferToDataURL } from '../../services/convertFunctions';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { deleteCompanyById, getCompanyByEmail } from '../../services/companyServices';

function AvatarDropdown() {
    const navigate = useNavigate()
    const authInfo = useSelector((state) => state.isAuthenticated.value);
    const [profilePhoto, setProfilePhoto] = useState(profile)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const { data: myInfos, isLoading: isLoadingInfos } = useQuery({
        queryKey: ["myInfos"],
        queryFn: () => {
            if (authInfo.typeUser == "employee")
                return getEmployeeByEmail(authInfo.email)
            else if (authInfo.typeUser == "company")
                return getCompanyByEmail(authInfo.email)
        }
    })


    useEffect(() => {
        if (!isLoadingInfos) {
            const photo = (authInfo?.typeUser == "employee" ? myInfos.data.profilePhoto : myInfos.data.company_photo)
            if (photo) {
                const base64Image = convertBufferToDataURL(photo);
                setProfilePhoto(base64Image);
            }
        }

    }, [myInfos])

    const handleDeleteAccount = async () => {
        const deleteResult = await authInfo?.typeUser == "employee" ? deleteEmployeeById(myInfos.data._id) : deleteCompanyById(myInfos.data._id)
        if (deleteResult) {
            navigate("/");
        }
    }


    return (
        <div>
            <Dropdown placement="bottom-end">
                <DropdownTrigger>
                    <Avatar
                        isBordered
                        as="button"
                        color='primary'
                        className="transition-transform"
                        size='sm'
                        src={profilePhoto}
                    />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="email" className="h-14 gap-2">
                        {
                            !isLoadingInfos &&
                            <>
                                {authInfo?.typeUser == "employee"
                                    ? <p className="font-semibold">Hi {myInfos.data.first_name} {myInfos.data.last_name}</p>
                                    : <p className="font-semibold">Hi {myInfos.data.company_name}</p>
                                }
                                <p className="font-semibold text-default-400">{myInfos.data.email}</p>
                            </>
                        }
                    </DropdownItem>
                    <DropdownItem key="profile" onClick={() => { navigate((authInfo?.typeUser == "employee" ? '/profile' : '/companies/company/' + authInfo?.userId)) }}>
                        My Profile
                    </DropdownItem>
                    <DropdownItem key="logout" className="text-danger-400" onClick={() => window.location.href = '/'}>
                        Log Out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>

            <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={"inside"} className="md:mb-0 mb-[10%]">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-[20px]">Upload Attachments</ModalHeader>
                            <ModalBody className="popupModel">
                                Are you sure you want to delete your account
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    cancel
                                </Button>
                                <Button color="primary" onPress={handleDeleteAccount}>
                                    Yes
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default AvatarDropdown