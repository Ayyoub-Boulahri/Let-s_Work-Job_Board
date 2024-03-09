import React, { useEffect, useState } from 'react'
import { FaRegBell } from "react-icons/fa";
import { Dropdown, DropdownSection, DropdownTrigger, DropdownMenu, DropdownItem, Divider } from "@nextui-org/react";
import NotificationCard from './NotificationCard';
import { changeNotificationStatus, getCompanyNotifications, getEmployeeNotifications, getTotalUnreadNotifications } from '../../services/notificationServices';
import { useNavigate } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import notificationSound from '../../assets/audios/notification_sound.wav'
import InfiniteScrillingLast from './InfiniteScrillingLast';
import { SERVERPOINT } from '../../schemas/data' 
function NotificationDropdown(props) {
    const [totalUnreadNotifications, setTotalUnreadNotifications] = useState(0)
    const [notifications, setNotifications] = useState([])
    const navigate = useNavigate()
    const notificationPerTime = 10
    const [page, setPage] = useState(1)

    useEffect(() => {
        getUnreadNotificationsCount();
        getNotifications()


        const socket = socketIOClient(SERVERPOINT, {
            query: {
                userId: props.userId
            }
        });

        // Listen for the 'jobOfferInserted' event from the server
        socket.on('sendNotification', (data) => {
            new Audio(notificationSound).play()
            getNotifications()
            setTotalUnreadNotifications(prev => (prev + 1))
        });

        return () => socket.disconnect()
    }, [page]);

    const getUnreadNotificationsCount = () => {
        getTotalUnreadNotifications(props.userId)
            .then((total) => {
                setTotalUnreadNotifications(total);
            })
            .catch(() => setTotalUnreadNotifications(0));
    }

    const getNotifications = async () => {
        if (props.typeUser == "employee") {
            getEmployeeNotifications(props.userId, (page - 1) * notificationPerTime, notificationPerTime)
                .then((response) => {
                    for(var i=0; i<response.length; i++) {
                        console.log(response[i].read)
                    }
                    if (page == 1) {
                        setNotifications(response)
                    }
                    else {
                        setNotifications(prev => [...prev, ...response])
                    }
                })
        } else if (props.typeUser == "company") {
            getCompanyNotifications(props.userId)
                .then((response) => setNotifications(response))
        }
    }

    const handleNotificationClicking = async (notificationId, link, isRead) => {
        if (isRead) {
            navigate(link);
        } else {
            await changeNotificationStatus(notificationId)
                .then(() => {
                    getUnreadNotificationsCount();
                    getNotifications()
                    navigate(link);
                })
        }
    }

    return (
        <>
            <Dropdown
                placement="bottom-end"
                classNames={{
                    base: "before:bg-default-200 w-[350px]",
                }}
            >
                <DropdownTrigger>
                    <button className="outline-none px-4 py-1">
                        <div className='relative'>
                            <FaRegBell size={23} />
                            {totalUnreadNotifications != 0 &&
                                <div className="text-[10px] text-white bg-danger-400 rounded-full px-1 absolute top-[-4px] right-[-2px]">
                                    {totalUnreadNotifications}
                                </div>
                            }
                        </div>
                    </button>
                </DropdownTrigger>
                <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
                    <DropdownSection title="Notifications" className="max-h-[300px] overflow-y-scroll">
                        {notifications.length == 0 ?
                            <DropdownItem description={"no notification"}></DropdownItem>


                            : notifications?.map((notification, index) => (
                                <DropdownItem
                                    onClick={() => handleNotificationClicking(notification._id, notification.notification_link, notification.read)}
                                    className={`mb-1 rounded-md ${!notification.read && "bg-[#262627]"}`}
                                    description={<NotificationCard notification={notification} />}>
                                </DropdownItem>
                            ))
                        }
                        <DropdownItem><InfiniteScrillingLast setPage={setPage} page={page} notificationPerTime={notificationPerTime} /></DropdownItem>
                    </DropdownSection>
                </DropdownMenu>
            </Dropdown>

        </>
    )
}

export default NotificationDropdown;
