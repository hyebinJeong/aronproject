import React, { useEffect, useState } from 'react'
import './Detailpage.css'
import Header from '../components/Header'
import GraphLine from '../components/GraphLine'

const Detailpage = () => {

  const [data, setData] = useState(null);

  return (
    <div>
      <Header></Header>
      <div className='space'>
      {/* GraphLine 컴포넌트에 데이터를 전달합니다. */}
      <GraphLine data={data} />
      </div>
    </div>
  )
}

export default Detailpage