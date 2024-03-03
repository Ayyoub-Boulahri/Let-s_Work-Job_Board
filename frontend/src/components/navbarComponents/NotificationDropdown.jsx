import React, { useEffect, useState } from 'react'
import { FaRegBell } from "react-icons/fa";
import { Dropdown, DropdownSection, DropdownTrigger, DropdownMenu, DropdownItem, Divider } from "@nextui-org/react";
import NotificationCard from './NotificationCard';
import { getTotalUnreadNotifications } from '../../services/notificationServices';

function NotificationDropdown(props) {
    const [totalUnreadNotifications, setTotalUnreadNotifications] = useState(0)

    useEffect(() => {
        getUnreadNotificationsCount();
        const intervalId = setInterval(getUnreadNotificationsCount, 20000);
        return () => clearInterval(intervalId);
    }, []);

    const getUnreadNotificationsCount = () => {
        getTotalUnreadNotifications(props.userId)
            .then((total) => {
                setTotalUnreadNotifications(total);
            })
            .catch(() => setTotalUnreadNotifications(5));
    }
    
    return (
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
                    <DropdownItem description={<NotificationCard />}></DropdownItem>
                    <DropdownItem description={<NotificationCard />}></DropdownItem>
                    <DropdownItem description={<NotificationCard />}></DropdownItem>
                    <DropdownItem description={<NotificationCard />}></DropdownItem>
                    <DropdownItem description={<NotificationCard />}></DropdownItem>
                    <DropdownItem description={<NotificationCard />}></DropdownItem>
                    <DropdownItem description={<NotificationCard />}></DropdownItem>
                    <DropdownItem description={<NotificationCard />}></DropdownItem>
                    <DropdownItem description={<NotificationCard />}></DropdownItem>
                    <DropdownItem description={<NotificationCard />}></DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    )
}

export default NotificationDropdown;
