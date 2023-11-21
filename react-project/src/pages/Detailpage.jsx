import React, { useEffect, useState } from 'react'

import './Detailpage.css'
import { SingleTable } from '../components/SingleTable'
import axios from 'axios';
import GraphLine from '../components/GraphLine'
import DetailAllTable from '../components/DetailAllTable';

const Detailpage = () => {

  //SingleTable 데이터
  const [datas, setDatas] = useState([]);



  useEffect(() => {
    axios.post('http://localhost:3001/detail/detail', {
      // front에서 back으로 보낼 값

    }).then((res) => {
      // back에서 front으로 보낼 값
      setDatas(res.data)
      //object형태로 데이터를 받아와야하기때문이다.
    })
  }, [])


  //DetailAllTable 데이터
  const [datum, setDatum] = useState([]);
  useEffect(() => {
    axios.post('http://localhost:3001/patients', {
      // front에서 back으로 보낼 값
    }).then((res) => {
      // back에서 front으로 보낼 값
      setDatum(res.data)
      //object형태로 데이터를 받아와야하기때문이다.
    })
  }, [])


  //Graph 데이터 
  const [data, setData] = useState(null);

  return (
    <div>
      <div className='space'>
        {/* GraphLine 컴포넌트에 데이터를 전달합니다. */}
        <SingleTable data={datas} />
        <GraphLine data={data} />
        <DetailAllTable data={datum} />
      </div>
    </div>
  )
}

export default Detailpage