import React from 'react'
import almostThere from "../../assets/almostThere.svg"

function AlmostThere() {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src={almostThere} alt="Almost there" className='w-[200px] mb-4'/>
      <h1 className="text-4xl font-bold mb-4">You're Almost There!</h1>
      <p className="text-lg">Just a few more steps to go...</p>
  </div>  )
}

export default AlmostThere