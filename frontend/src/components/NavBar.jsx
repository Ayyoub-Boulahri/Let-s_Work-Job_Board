import React from 'react'
import { Navbar, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, NavbarBrand, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import { useState } from 'react';

function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(true);


    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} >
            <NavbarContent>
                <NavbarBrand>
                    <p className="text-primary-500 font-extrabold text-[22px] cursor-pointer">Let's Work</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Home
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        About
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Contact
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                </NavbarItem>
                <NavbarItem>
                    <Button color="primary" href="#" variant="flat">
                        Sign Up
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}

export default NavBar