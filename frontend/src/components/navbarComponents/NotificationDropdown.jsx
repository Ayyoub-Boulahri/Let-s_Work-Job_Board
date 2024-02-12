import React from 'react'
import { FaRegBell } from "react-icons/fa";
import { Dropdown, DropdownSection, DropdownTrigger, DropdownMenu, DropdownItem, Divider } from "@nextui-org/react";
import NotificationCard from './NotificationCard';

function NotificationDropdown() {
    return (
        <Dropdown
            placement="bottom-end"
            classNames={{
                base: "before:bg-default-200 w-[350px]",
            }}
        >
            <DropdownTrigger>
                <button className="outline-none px-4 py-1"><FaRegBell size={23} /></button>

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

export default NotificationDropdown