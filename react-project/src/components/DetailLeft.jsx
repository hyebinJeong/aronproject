import React from 'react'
import GraphDetailDBP from './GraphDetailDBP'
import GraphDetailHR from './GraphDetailHR'
import GraphBarOne from './GraphBarOne'
import GraphDetailMAP from './GraphDetailMAP'
import GraphDetailO2Sat from './GraphDetailO2Sat'
import GraphDetailResp from './GraphDetailResp'
import GraphDetailSBP from './GraphDetailSBP'
import GraphDetailTemp from './GraphDetailTemp'

const Detailleft = () => {
  return (
    <div>
      <GraphDetailDBP></GraphDetailDBP>
      <GraphDetailHR></GraphDetailHR>
      <GraphDetailMAP></GraphDetailMAP>
      <GraphDetailO2Sat></GraphDetailO2Sat>
      <GraphDetailResp></GraphDetailResp>
      <GraphDetailSBP></GraphDetailSBP>
      <GraphDetailTemp></GraphDetailTemp>
    </div>
  )
}

export default Detailleft