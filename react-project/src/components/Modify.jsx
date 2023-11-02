import React from 'react'
import iconModify from '../../image/iconMoidify.svg'
import './Modify.css'

const Modify = () => {
  return (
    <button className='btn-modify'>
      <img className='modify-icon' src={iconModify} alt="" />
      <p className='font-modify'>수정</p>
    </button>
  )
}

export default Modify;