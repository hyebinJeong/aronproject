import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { useState } from 'react'
import './Graph.css'

const GraphBar = () => {

    // 시간에 따른 HR, SBP, O2Sat, MAP, DBP값을 담은 객체들의 배열을 할당
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

    // 'keys'라는 상태를 선언하고, 초기값으로 'DBdata'의 첫 번째 객체의 키들 중 'Time'을 제외한 키들의 배열 할당
    const [keys, setKeys] = useState(Object.keys(DBdata[0]).filter(key => key !== 'Time'));

    // 'key'를 인자로 받아 'keys'상태에 'key'가 포함되어 있으면 'key'를 제외한 나머지 배열을,
    // 포함되어 있지 않으면 'key'를 추가한 새로운 배열을 'keys' 상태에 할당

    // key --> 사용자가 클릭한 체크박스에 해당하는 데이터 종류
    // item --> keys 배열의 각 원소
    // 예를들어, 사용자가 'HR' 체크박스 클릭하면 'HR'이 'key'로 handleCheckboxChange 함수에 전달되고,
    // 이 함수는 'keys'상태를 업데이트하여 그래프가 'HR' 데이터를 포함하거나 제외하도록 함

    const handleCheckboxChange = (key) => {
        if (keys.includes(key)) {
        setKeys(keys.filter(item => item !== key));
        } else {
        setKeys([...keys, key]);
        }
    };

    // MyResponsiveBar 컴포넌트
    // 'data'와, 'keys'를 props로 받아 '@nivo/bar'의 'ResponsiveBar' 컴포넌트 리턴함
    // 이 컴포넌트의 props는 그래프의 모양, 색상, 축 등을 설정함
    const MyResponsiveBar = ({ data, keys }) => {

        return (
            <ResponsiveBar
                data={data}
                keys={keys}
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
    };
    console.log(DBdata)
  return (
    // 'keys'상태에 해당하는 키가 포함되어 있으면 체크되고, 체크박스가 클릭되면 'handleCheckboxChange'함수가 실행됨
    // 'keys'상태 --> 그래프에 어떤 데이터 세트가 표시될지 결정
    // 그리고 'MyResponsiveBar' 컴포넌트를 렌더링 하며, 'DBdata'와 'keys'를 props로 전달함
    <div className='graph-size'>
      <div className='checkbox-wrap'>
        <div className="index-name">
            <input type="checkbox" checked={keys.includes('HR')} onChange={() => handleCheckboxChange('HR')} /> HR
        </div>
        <div className="index-name">
            <input type="checkbox" checked={keys.includes('O2Sat')} onChange={() => handleCheckboxChange('O2Sat')} /> O2Sat
        </div>
        <div className="index-name">
            <input type="checkbox" checked={keys.includes('SBP')} onChange={() => handleCheckboxChange('SBP')} /> SBP
        </div>
        <div className="index-name">
            <input type="checkbox" checked={keys.includes('MAP')} onChange={() => handleCheckboxChange('MAP')} /> MAP
        </div>
        <div className="index-name">
            <input type="checkbox" checked={keys.includes('DBP')} onChange={() => handleCheckboxChange('DBP')} /> DBP
        </div>
      </div>
        <MyResponsiveBar data={DBdata} keys={keys}/>
    </div>
  )
}

export default GraphBar;