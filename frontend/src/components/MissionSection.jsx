import React from 'react'
import styles from '../style';

import { Divider } from "@nextui-org/react";
import { Text, Box, Flex, Card } from '@radix-ui/themes';
import { FaRegSmile } from 'react-icons/fa';
import { AiOutlineLineChart } from 'react-icons/ai';
import { GiTwoCoins } from 'react-icons/gi';

function MissionSection() {

    const whyChooseUs = [
        {
            id: 1,
            title: "User-Friendly Experience",
            content: "Our platform is designed with simplicity in mind, ensuring a smooth and intuitive user experience for both job seekers and employers.",
            icon: <FaRegSmile className="icon" size={30} />
        },
        {
            id: 1,
            title: "Personalized Connections",
            content: "We go beyond traditional job matching, focusing on the unique qualities and aspirations of each user to create meaningful connections.",
            icon: <GiTwoCoins className="icon" size={30} />
        },
        {
            id: 1,
            title: "Industry-Leading Technology",
            content: "Leveraging cutting-edge technology, we stay ahead of the curve to provide the latest features and innovations.",
            icon: <AiOutlineLineChart className="icon" size={30} />
        }
    ]

    return (
        <div className='w-full flex gap-8 p-5 sm:flex-row flex-col justify-center'>
            <div className='flex flex-col items-start px-3 sm:w-[35%]'>
                <h2 className='text-[24px] font-bold text-gray-300 mb-4'>Our Mission</h2>
                <p className={`${styles.paragraph} text-gray-400 text-[16px] text-justify`}>
                    At <span className='text-primary-500 font-bold'>Let's Work</span>, our mission is simple yet powerful: to empower individuals in their career
                    journeys by seamlessly bridging the gap between employers and job seekers.
                    We believe that every career path is unique, and our platform is designed to facilitate
                    the perfect match, fostering professional growth and success.
                </p>
            </div>

            <Divider orientation="vertical" className='h-100' />

            <div className='flex flex-col items-start px-3 flex-1 gap-4'>
                <h2 className='text-[24px] font-bold text-gray-300 mb-4'>why choose Let's Work ?</h2>
                {whyChooseUs.map((card) => (
                    <Card key={card.id} className='w-full'>
                        <Flex gap="3" align="center">
                            {card.icon}
                            <Box>
                                <Text as="div" size="2" weight="bold">
                                    {card.title}
                                </Text>
                                <Text as="div" size="2" color="gray">
                                    {card.content}
                                </Text>
                            </Box>
                        </Flex>
                    </Card>
                ))}
            </div>

        </div>
    )
}

export default MissionSection