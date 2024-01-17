import React from 'react'

function DegreeCard(props) {
  return (
    <div className='w-[200px] bg-zinc-800 m-4 rounded-md px-4 py-1 '>
        <div className='flex flex-col  items-center'>
            <span>{props.name}</span>
            <span>{props.place}</span>
            <span>{props.year}</span>
        </div>
    </div>
  )
}

export default DegreeCard