import React from 'react'
import styles from '../style'
import Leading from '../components/companieComponents/Leading'
import SearchSection from '../components/companieComponents/SearchSection'
import { Divider} from "@nextui-org/react";

function Companies() {
  return (
    <div className={`${styles.flexStart} pt-20 xl:pb-4`}>
      <div className={`${styles.boxWidth}`}>
        <Leading/>
        <Divider className="my-4 bg-[#3D3D3D] sm:block hidden w-[80%] ml-24 " />
        <SearchSection/>
      </div>
    </div>
  )
}

export default Companies