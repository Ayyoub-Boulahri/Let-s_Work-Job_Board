import React from 'react'
import { Avatar } from '@nextui-org/react'
import { Text } from '@radix-ui/themes'
import { FaGithub, FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

function TeamCard(props) {
    return (
        <div className='flex flex-col bg-[#17191C] rounded-lg py-3 px-4' key={props.member.id}>
            <div className='flex justify-between'>
                <Avatar isBordered color="primary" src={props.member.image} className="w-[60px] h-[60]" />
                <div className='ml-6'>
                    <Text as="div" size="4" weight="bold">
                        {props.member.name}
                    </Text>
                    <Text as="div" size="2" color="gray" weight="medium">
                        {props.member.bio}
                    </Text>
                </div>
            </div>

            <div className='flex justify-end gap-4'>
                <a href={props.member.links.instagram}><AiFillInstagram size={20} /></a>
                <a href={props.member.links.github}><FaGithub size={20} /></a>
                <a href={props.member.links.facebook}><FaFacebook size={20} /></a>
            </div>

        </div>
    )
}

export default TeamCard