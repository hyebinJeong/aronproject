import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { useState } from 'react'

const GraphBar2 = () => {

    const [HR, showHR] = useState(true)
    const [O2Sat, showO2Sat] = useState(true)
    const [SBP, showSBP] = useState(true)
    const [MAP, showMAP] = useState(true)
    const [DBP, showDBP] = useState(true)


    const DBdata = [
        {
            "Time": "00:00",
            'HR': 110,
            "SBP": 120,
            "O2Sat": 98,
            "MAP": 113,
            "DBP": 112,
        },
        {
            "Time": "04:00",
            "HR": 111,
            "SBP": 119,
            "O2Sat": 99,
            "MAP": 108,
            "DBP": 111,
        },
        {
            "Time": "08:00",
            "HR": 107,
            "SBP": 119,
            "O2Sat": 99,
            "MAP": 108,
            "DBP": 111,
        },
        {
            "Time": "12:00",
            "HR": 104,
            "SBP": 120,
            "O2Sat": 97,
            "MAP": 116,
            "DBP": 113,
        },
        {
            "Time": "16:00",
            "HR": 106,
            "SBP": 120,
            "O2Sat": 98,
            "MAP": 110,
            "DBP": 112,
        },
        {
            "Time": "20:00",
            "HR": 112,
            "SBP": 121,
            "O2Sat": 96,
            "MAP": 118,
            "DBP": 117,
        }
      ]

      const originalData = [ // DB에서 받아온 정보를 map함수로 반복처리
      {
        "id": "HR",
        "color": "hsl(211, 70%, 50%)",
        "data": DBdata.map(d => ({ x: d.Time, y: d.HR }))
      },
      {
        "id": "O2Sat",
        "color": "hsl(211, 70%, 50%)",
        "data": DBdata.map(d => ({ x: d.Time, y: d.O2Sat }))
      },
      {
        "id": "Temp",
        "color": "hsl(211, 70%, 50%)",
        "data": DBdata.map(d => ({ x: d.Time, y: d.Temp }))
      },
      {
        "id": "SBP",
        "color": "hsl(211, 70%, 50%)",
        "data": DBdata.map(d => ({ x: d.Time, y: d.SBP }))
      },
      {
        "id": "MAP",
        "color": "hsl(211, 70%, 50%)",
        "data": DBdata.map(d => ({ x: d.Time, y: d.MAP }))
      },
      {
        "id": "DBP",
        "color": "hsl(211, 70%, 50%)",
        "data": DBdata.map(d => ({ x: d.Time, y: d.DBP }))
      },
      {
        "id": "Resp",
        "color": "hsl(211, 70%, 50%)",
        "data": DBdata.map(d => ({ x: d.Time, y: d.Resp }))
      }
    ]

    let data = originalData.filter(d => {
        if (d.id === 'HR' && HR) return true;
        if (d.id === 'O2Sat' && O2Sat) return true;
        if (d.id === 'SBP' && SBP) return true;
        if (d.id === 'MAP' && MAP) return true;
        if (d.id === 'DBP' && DBP) return true;
        return false;
        // if (d.id === 'HR' && !HR) return true;
        // if (d.id === 'O2Sat' && !O2Sat) return true;
        // if (d.id === 'SBP' && !SBP) return true;
        // if (d.id === 'MAP' && !MAP) return true;
        // if (d.id === 'DBP' && !DBP) return true;
        return true;
      });


      const MyResponsiveBar = ({ data }) => (
        <ResponsiveBar
            data={data}
            keys={[
                'HR',
                'O2Sat',
                'SBP',
                'MAP',
                'DBP'
            ]}
            indexBy="Time"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            groupMode="grouped"
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'nivo' }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            // fill={[
            //     {
            //         match: {
            //             id: 'fries'
            //         },
            //         id: 'dots'
            //     },
            //     {
            //         match: {
            //             id: 'sandwich'
            //         },
            //         id: 'lines'
            //     }
            // ]}
            // borderColor={{
            //     from: 'color',
            //     modifiers: [
            //         [
            //             'darker',
            //             1.6
            //         ]
            //     ]
            // }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Time',
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'score',
                legendPosition: 'middle',
                legendOffset: -40
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
            role="application"
            ariaLabel="Nivo bar chart demo"
            barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
        />
    )
    console.log(DBdata)
    console.log(data)
  return (
    <div className='graph-size'>
      <div>
        {/* <input type="checkbox" checked={HR} onChange={() => {showHR(!HR); updateData();}} /> HR
        <input type="checkbox" checked={O2Sat} onChange={() => {showO2Sat(!O2Sat); updateData();}} /> O2Sat
        <input type="checkbox" checked={SBP} onChange={() => {showSBP(!SBP); updateData();}} /> SBP
        <input type="checkbox" checked={MAP} onChange={() => {showMAP(!MAP); updateData();}} /> MAP
        <input type="checkbox" checked={DBP} onChange={() => {showDBP(!DBP); updateData();}} /> DBP */}
        <input type="checkbox" checked={HR} onChange={() => showHR(!HR)} /> HR
        <input type="checkbox" checked={O2Sat} onChange={() => showO2Sat(!O2Sat)} /> O2Sat
        <input type="checkbox" checked={SBP} onChange={() => showSBP(!SBP)} /> SBP
        <input type="checkbox" checked={MAP} onChange={() => showMAP(!MAP)} /> MAP
        <input type="checkbox" checked={DBP} onChange={() => showDBP(!DBP)} /> DBP
      </div>
      <MyResponsiveBar data={DBdata}/>
    </div>
  )
}

export default GraphBar2;