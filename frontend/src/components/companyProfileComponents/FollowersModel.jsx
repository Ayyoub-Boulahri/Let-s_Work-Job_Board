import React, { useEffect, useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Divider } from "@nextui-org/react";
import { convertBufferToDataURL, formatNumFollowers } from '../../services/convertFunctions';
import InfiniteScroll from 'react-infinite-scroll-component'
import { getCompanyFollowers } from '../../services/companyServices';
import { User, Spinner } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';

function FollowersModel(props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [followers, setFollowers] = useState([])
    const followerPerTime = 5;
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        const getInitialData = async () => {
            getCompanyFollowers(props.company_id, 0, followerPerTime).then((response) => {
                setFollowers(response);
            })
        }
        getInitialData()
    }, [])

    const navigate = useNavigate()
    const getMoreFollowers = async () => {
        if (followers.length !== props.followersCount) {
            const response = await getCompanyFollowers(props.company_id, followers.length, followerPerTime)
            setFollowers(prev => [...prev, ...response]);
        }
        else
            setHasMore(false)
    }

    return (
        <>
            <h1 className='font-bold text-primary-600 cursor-pointer text-[18px]' onClick={onOpen}>{formatNumFollowers(props.followersCount)}&nbsp;&nbsp;<span className='font-semibold text-default-400'>followers</span></h1>
            <Modal isOpen={isOpen} placement='center' size='sm' onOpenChange={onOpenChange} scrollBehavior={"inside"}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-[20px]">Followers</ModalHeader>
                            <ModalBody className="popupModel">
                                <InfiniteScroll
                                    height={300}
                                    // className="scrollbar-hide"
                                    dataLength={followers.length}
                                    next={getMoreFollowers}
                                    hasMore={hasMore}
                                    loader={<div className='flex justify-center mt-2'><Spinner size='sm'/></div>}
                                >
                                    {
                                        followers.map((follower => (
                                            <>
                                                <User
                                                    onClick={() => {navigate("/profiles/profile/" + follower._id)}}
                                                    key={follower._id}
                                                    name={follower.first_name + ' ' + follower.last_name}
                                                    description={follower.email}
                                                    className='py-4 text-[20px] cursor-pointer'
                                                    avatarProps={{
                                                        src: convertBufferToDataURL(follower.profilePhoto)
                                                    }}
                                                />
                                                <Divider />
                                            </>
                                        )))
                                    }
                                </InfiniteScroll>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </>
    )
}

export default FollowersModel