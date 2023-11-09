// Graph.jsx
import { useEffect, useState } from "react"
import { ResponsiveLine } from '@nivo/line'
import './Graph.css'
import axios from 'axios';

function GraphLine() {

  const [HR, showHR] = useState(true)
  const [O2Sat, showO2Sat] = useState(true)
  const [Temp, showTemp] = useState(true)
  const [SBP, showSBP] = useState(true)
  const [MAP, showMAP] = useState(true)
  const [DBP, showDBP] = useState(true)
  const [Resp, showResp] = useState(true)

  // 날짜 선택 상태 변수
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [DBdata, setDBdata] = useState([ // 가상의 데이터베이스에서 받아온 정보
    { Time: '00:00', HR : 110 , Temp : 36.5, SBP : 120, O2Sat : 98,
      MAP : 111, DBP : 107, Resp : 20},
    { Time: '04:00', HR : 111 , Temp : 36.8, SBP : 119, O2Sat : 99,
      MAP : 113, DBP : 109, Resp : 18},
    { Time: '08:00', HR : 107 , Temp : 37.1, SBP : 119, O2Sat : 99,
      MAP : 108, DBP : 111, Resp : 19},
    { Time: '12:00', HR : 104 , Temp : 36.9, SBP : 120, O2Sat : 97,
      MAP : 116, DBP : 113, Resp : 15},
    { Time: '16:00', HR : 106 , Temp : 36.8, SBP : 120, O2Sat : 98,
      MAP : 110, DBP : 112, Resp : 20},
    { Time: '20:00', HR : 112 , Temp : 37.0, SBP : 121, O2Sat : 96,
      MAP : 118, DBP : 117, Resp : 17}
  ]);

  const handleSearch = () => {
    axios.get('API주소')
      .then(response => {
        const data = response.data; // 서버에서 받아온 데이터
        console.log(data); // 콘솔에 데이터 출력
        const filteredData = data.filter(
          (d) =>
            new Date(d.Time) >= new Date(startDate) &&
            new Date(d.Time) <= new Date(endDate)
        );
        setDBdata(filteredData); // 상태 업데이트
      })
      .catch(error => {
        console.error('Error fetching data', error); //에러처리
      })
  };

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
    // if (d.id === 'Temp' && Temp) return true;
    if (d.id === 'SBP' && SBP) return true;
    if (d.id === 'MAP' && MAP) return true;
    if (d.id === 'DBP' && DBP) return true;
    // if (d.id === 'Resp' && Resp) return true;
    return false;
  });

    const MyResponsiveLine = ({ data }) => (
      <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{
              type: 'linear',
              min: 'auto',
              max: 'auto',
              stacked: false,
              reverse: false
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Time',
              legendOffset: 36,
              legendPosition: 'middle'
          }}
          axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'score',
              legendOffset: -40,
              legendPosition: 'middle'
          }}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          enableSlices="x"
          useMesh={true}
          legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
)
  
return (
    <div className = 'graph-size'>
      <div className="checkbox-wrap">
        <div className="index-name">
          <input type="checkbox" className="checkbox" checked={HR} onChange={() => showHR(!HR)} /> HR
        </div>
        <div className="index-name">
          <input type="checkbox" checked={O2Sat} onChange={() => showO2Sat(!O2Sat)} /> O2Sat
        </div>
        {/* <div className="index-name">
          <input type="checkbox" checked={Temp} onChange={() => showTemp(!Temp)} /> Temp
        </div> */}
        <div className="index-name">
          <input type="checkbox" checked={SBP} onChange={() => showSBP(!SBP)} /> SBP
        </div>
        <div className="index-name">
          <input type="checkbox" checked={MAP} onChange={() => showMAP(!MAP)} /> MAP
        </div>
        <div className="index-name">
          <input type="checkbox" checked={DBP} onChange={() => showDBP(!DBP)} /> DBP
        </div>
        {/* <div className="index-name">
          <input type="checkbox" checked={Resp} onChange={() => showResp(!Resp)} /> Resp
        </div> */}
        <div className="date">
          <input type="date" onChange={(e) => setStartDate(e.target.value)} />
          <p> - </p>
          <input type="date" onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <button className="search-button" onClick={handleSearch}>검색</button>
      </div>
      <MyResponsiveLine data={data}/>
    </div>
)
}

export default GraphLine;