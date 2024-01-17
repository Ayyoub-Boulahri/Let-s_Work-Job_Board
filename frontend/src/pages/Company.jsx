import React from 'react'
import { useParams } from 'react-router-dom';
function Company() {
    const { company_id } = useParams();

  return (
    <div>{id}</div>
  )
}

export default Company