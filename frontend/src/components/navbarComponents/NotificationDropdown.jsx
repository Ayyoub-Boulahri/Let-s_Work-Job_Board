import React from 'react'
import { FaRegBell } from "react-icons/fa";
import { Dropdown, DropdownSection, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";

function NotificationDropdown() {
    return (
        <Dropdown
            placement="bottom-end"
            classNames={{
                base: "before:bg-default-200", // change arrow background
                content: "py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black",
            }}
        >
            <DropdownTrigger>
                <button className="outline-none px-4 py-1"><FaRegBell size={23} /></button>

            </DropdownTrigger>
            <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
                <DropdownSection title="Actions">
                    <DropdownItem
                        key="new"
                        shortcut="⌘N"
                        description="Create a new file"
                    >
                        New file
                    </DropdownItem>
                    <DropdownItem
                        key="copy"
                        shortcut="⌘C"
                        description="Copy the file link"
                    >
                        Copy link
                    </DropdownItem>
                    <DropdownItem
                        key="edit"
                        shortcut="⌘⇧E"
                        description="Allows you to edit the file"
                    >
                        Edit file
                    </DropdownItem>
                </DropdownSection>
                <DropdownSection title="Danger zone">
                    <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="danger"
                        shortcut="⌘⇧D"
                        description="Permanently delete the file"
                    >
                        Delete file
                    </DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    )
}

export default NotificationDropdown