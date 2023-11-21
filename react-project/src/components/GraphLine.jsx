// Graph.jsx
import { useEffect, useState } from "react"
import { ResponsiveLine } from '@nivo/line'
import './Graph.css'
import axios from 'axios';
import { useSearchParams } from 'react-router-dom'

function GraphLine() {
  // record_time, sepsis_score, HR, O2Sat, SBP, DBP, BT, pid 필요

  const [HR, showHR] = useState(true);
  const [O2Sat, showO2Sat] = useState(true);
  // const [Temp, showTemp] = useState(true)
  const [SBP, showSBP] = useState(true);
  // const [MAP, showMAP] = useState(true)
  const [DBP, showDBP] = useState(true);
  // const [Resp, showResp] = useState(true);
  const [BT, showBT] = useState(true);
  const [sepsis_score, showSepsis_score] = useState(true);
  const [searchParams] = useSearchParams();
  const pid = searchParams.get("pid"); // 환자 id가져오기

  console.log(pid);

  // 모든 체크박스를 체크하는 함수
  const checkAll = () => {
    showHR(true);
    showO2Sat(true);
    showSBP(true);
    showDBP(true);
    showBT(true);
    showSepsis_score(true);
  };

  // 모든 체크박스를 해제하는 함수
  const uncheckAll = () => {
    showHR(false);
    showO2Sat(false);
    showSBP(false);
    showDBP(false);
    showBT(false);
    showSepsis_score(false);
  };

  // 날짜 선택 상태 변수
  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");

  // axios주소 가져오게 되면
  const [DBdata, setDBdata] = useState([]);

  // const [DBdata, setDBdata] = useState([
  //   // 가상의 데이터베이스에서 받아온 정보
  //   {
  //     //record_time, sepsis_score, HR, O2Sat, SBP, DBP, BT, pid 필요
  //     record_time: "00:00",
  //     sepsis_score: 70,
  //     HR: 110,
  //     BT: 36.5,
  //     SBP: 120,
  //     O2Sat: 98,
  //     DBP: 107,
  //   },
  //   {
  //     record_time: "04:00",
  //     sepsis_score: 65,
  //     HR: 111,
  //     BT: 36.8,
  //     SBP: 119,
  //     O2Sat: 99,
  //     DBP: 109,
  //   },
  //   {
  //     record_time: "08:00",
  //     sepsis_score: 73,
  //     HR: 107,
  //     BT: 37.1,
  //     SBP: 119,
  //     O2Sat: 99,
  //     DBP: 111,
  //   },
  //   {
  //     record_time: "12:00",
  //     sepsis_score: 70,
  //     HR: 104,
  //     BT: 36.9,
  //     SBP: 120,
  //     O2Sat: 97,
  //     DBP: 113,
  //   },
  //   {
  //     record_time: "16:00",
  //     sepsis_score: 80,
  //     HR: 106,
  //     BT: 36.8,
  //     SBP: 120,
  //     O2Sat: 98,
  //     DBP: 112,
  //   },
  //   {
  //     record_time: "20:00",
  //     sepsis_score: 76,
  //     HR: 112,
  //     BT: 37.0,
  //     SBP: 121,
  //     O2Sat: 96,
  //     DBP: 117,
  //   },
  // ]);

  // 데이터 받아옴

  useEffect(() => {
    console.log('useeffect')

    axios.post("http://localhost:3001/detail/alldata", {
      patient_id: pid
    }).then((res) => {
      console.log('res', res)
      setDBdata(res.data);
    })
      ;
  }, [])

  const originalData = [
    // DB에서 받아온 정보를 map함수로 반복처리
    {
      id: "HR",
      color: "hsl(211, 70%, 50%)",
      data: DBdata.map((d) => ({ x: d.record_time.slice(11,16), y: d.HR })),
    },
    {
      id: "sepsis_score",
      color: "hsl(211, 70%, 50%)",
      data: DBdata.map((d) => ({ x: d.record_time.slice(11,16), y: d.sepsis_score })),
    },
    {
      id: "O2Sat",
      color: "hsl(211, 70%, 50%)",
      data: DBdata.map((d) => ({ x: d.record_time.slice(11,16), y: d.O2Sat })),
    },
    {
      id: "BT",
      color: "hsl(211, 70%, 50%)",
      data: DBdata.map((d) => ({ x: d.record_time.slice(11,16), y: d.Temp })),
    },
    {
      id: "SBP",
      color: "hsl(211, 70%, 50%)",
      data: DBdata.map((d) => ({ x: d.record_time.slice(11,16), y: d.SBP })),
    },
    {
      id: "DBP",
      color: "hsl(211, 70%, 50%)",
      data: DBdata.map((d) => ({ x: d.record_time.slice(11,16), y: d.DBP })),
    },
  ];
  
  // let minY = Infinity;
  // let maxY = -Infinity;

  // originalData.forEach((d) => {
  //   d.data.forEach((point) => {
  //     minY = Math.min(minY, point.y);
  //     maxY = Math.max(maxY, point.y);
  //   });
  // });

  let data = originalData.filter((d) => {
    if (d.id === "sepsis_score" && sepsis_score) return true;
    if (d.id === "HR" && HR) return true;
    if (d.id === "O2Sat" && O2Sat) return true;
    // if (d.id === 'Temp' && Temp) return true;
    if (d.id === "SBP" && SBP) return true;
    // if (d.id === "MAP" && MAP) return true;
    if (d.id === "DBP" && DBP) return true;
    if (d.id === "BT" && BT) return true;
    return false;
  });

  const MyResponsiveLine = ({ data }) => (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "record_time",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      // 각 요소별로 추가하여 멀티 y축 구현
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "score",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      // axisLeft={
      //   [{
      //     orient: "left",
      //     tickSize: 10,
      //     tickPadding: 5,
      //     tickRotation: 0,
      //     legend: "HR",
      //     legendOffset: -40,
      //     legendPosition: "middle",
      //     scale: { type: "linear", min: "auto", max: "auto" }, // 각 요소의 스케일을 설정합니다.
      //   },
      //   {
      //     orient: "right",
      //     tickSize: 10,
      //     tickPadding: 5,
      //     tickRotation: 0,
      //     legend: "O2Sat",
      //     legendOffset: -40,
      //     legendPosition: "middle",
      //     scale: { type: "linear", min: "auto", max: "auto" },
      //   }]
      // }
      colors={{ scheme: "category10" }}
      pointSize={6}
      pointColor={{ from: "color", modifiers: [] }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={12}
      enableSlices="x"
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );

  //sepsis_score, HR, O2Sat, SBP, DBP, BT
  return (
    <div className="graph-size">
      <div className="parent-container">
        <div className="checkbox-container">
          <div className="checkbox-wrap">
            <div className="detail-check-btn">
              <button className="all-btn" onClick={checkAll}>
                ALL
              </button>
              <button className="allout-btn" onClick={uncheckAll}>
                ALL OUT
              </button>
            </div>
            <div className="index-name">
              <input
                type="checkbox"
                className="checkbox"
                checked={sepsis_score}
                onChange={() => showSepsis_score(!sepsis_score)}
              />{" "}
              Sepsis score
            </div>
            <div className="index-name">
              <input
                type="checkbox"
                className="checkbox"
                checked={HR}
                onChange={() => showHR(!HR)}
              />{" "}
              HR
            </div>
            <div className="index-name">
              <input
                type="checkbox"
                checked={O2Sat}
                onChange={() => showO2Sat(!O2Sat)}
              />{" "}
              O2Sat
            </div>
            <div className="index-name">
              <input
                type="checkbox"
                checked={SBP}
                onChange={() => showSBP(!SBP)}
              />{" "}
              SBP
            </div>
            <div className="index-name">
              <input
                type="checkbox"
                checked={DBP}
                onChange={() => showDBP(!DBP)}
              />{" "}
              DBP
            </div>
            <div className="index-name">
              <input
                type="checkbox"
                checked={BT}
                onChange={() => showBT(!BT)}
              />{" "}
              BT
            </div>
            {/* <div className="index-name">
            <input type="checkbox" checked={Resp} onChange={() => showResp(!Resp)} /> Resp
          </div> */}
            {/* <div className="date"> */}
            {/* <input type="date" onChange={(e) => setStartDate(e.target.value)} /> */}
            {/* <p> - </p> */}
            {/* <input type="date" onChange={(e) => setEndDate(e.target.value)} /> */}
            {/* </div> */}
            {/* <button className="search-button" onClick={handleSearch}>
            검색
          </button> */}
          </div>
        </div>
        <div className="graph-container">
          <MyResponsiveLine className="detail-graph-wrap" data={data} />
        </div>
      </div>
    </div>
  );
}

export default GraphLine;