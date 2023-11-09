import React from 'react'
import './Detailpage.css'
import Header from '../components/Header'
import GraphLine from '../components/GraphLine'

const Detailpage = () => {
  return (
    <div>
      <Header></Header>
      <div className='space'>
      <GraphLine></GraphLine>
      </div>
    </div>
  )
}

export default Detailpage