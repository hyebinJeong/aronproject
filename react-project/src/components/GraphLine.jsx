import { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import "./Graph.css";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

function GraphLine({ startDate, endDate }) {
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
  const [filteredData, setFilteredData] = useState([]);


  // useEffect(() => {
  //   if (startDate !== "" && endDate !== "") {
  //     // 날짜 문자열을 Date 객체로 변환합니다.
  //     const start = new Date(startDate);
  //     const end = new Date(endDate);

  //     // 선택된 기간에 맞는 데이터만 필터링합니다.
  //     const newFilteredData = DBdata.filter((d) => {
  //       // record_time이 'YYYY-MM-DD HH:MM' 형태라고 가정하고, 이를 Date 객체로 변환합니다.
  //       const recordTime = new Date(d.record_time.replace(" ", "T"));
  //       return recordTime >= start && recordTime <= end;
  //     });

  //     // 필터링된 데이터로 상태를 업데이트합니다.
  //     setFilteredData(newFilteredData);
  //   }
  // }, [startDate, endDate]);


  useEffect(() => {
    // 전체 데이터 가져오기
    axios
      .post("http://localhost:3001/detail/alldata", {
        patient_id: pid,
      })
      .then((res) => {
        if (res.data.length > 0) { // 데이터가 있을 경우에만 처리
          setDBdata(res.data);

          // 가장 최신 날짜의 데이터 하루 필터링
          const sortedData = res.data.sort((a, b) => new Date(a.record_time) - new Date(b.record_time));
          if (sortedData.length > 0) {
            const latestDate = sortedData[sortedData.length - 1].record_time.split(" ")[0];
            const startDate = new Date(latestDate);
            const endDate = new Date(latestDate);
            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(23, 59, 59, 999);
            const latestData = sortedData.filter((d) => {
              const recordTime = new Date(d.record_time.replace(" ", "T"));
              return recordTime >= startDate && recordTime <= endDate;
            });
            setFilteredData(latestData);
          }
        }
      });
  }, [pid]);

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);

      const newFilteredData = DBdata.filter((d) => {
        const recordTime = new Date(d.record_time.replace(" ", "T"));
        return recordTime >= start && recordTime <= end;
      });

      setFilteredData(newFilteredData);
    } else {
      // startDate와 endDate가 없을 때는 최신 데이터 중 하루만 필터링
      const sortedData = DBdata.sort((a, b) => new Date(a.record_time) - new Date(b.record_time));
      if (sortedData.length > 0) {
        const latestDate = sortedData[sortedData.length - 1].record_time.split(" ")[0];
        const startDate = new Date(latestDate);
        const endDate = new Date(latestDate);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        const latestData = sortedData.filter((d) => {
          const recordTime = new Date(d.record_time.replace(" ", "T"));
          return recordTime >= startDate && recordTime <= endDate;
        });
        setFilteredData(latestData);
      }
    }
  }, [startDate, endDate, DBdata]);


  const originalData = [
    // DB에서 받아온 정보를 map함수로 반복처리
    {
      id: "HR",
      color: "hsl(211, 70%, 50%)",
      data: filteredData.map((d) => ({
        x: d.record_time,
        y: d.HR,
      })),
    },
    {
      id: "sepsis_score",
      color: "hsl(211, 70%, 50%)",
      data: filteredData.map((d) => ({
        x: d.record_time,
        y: d.sepsis_score,
      })),
    },
    {
      id: "O2Sat",
      color: "hsl(211, 70%, 50%)",
      data: filteredData.map((d) => ({
        x: d.record_time,
        y: d.O2Sat,
      })),
    },
    {
      id: "BT",
      color: "hsl(211, 70%, 50%)",
      data: filteredData.map((d) => ({
        x: d.record_time,
        y: d.Temp,
      })),
    },
    {
      id: "SBP",
      color: "hsl(211, 70%, 50%)",
      data: filteredData.map((d) => ({
        x: d.record_time,
        y: d.SBP,
      })),
    },
    {
      id: "DBP",
      color: "hsl(211, 70%, 50%)",
      data: filteredData.map((d) => ({
        x: d.record_time,
        y: d.DBP,
      })),
    },
  ];


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
            {/* <div className="date">
              <input type="date" onChange={(e) => setStartDate(e.target.value)} />
              <p> - </p>
              <input type="date" onChange={(e) => setEndDate(e.target.value)} />
            </div> */}

          </div>
        </div>
        <div className="graph-container">
          <MyResponsiveLine className="detail-graph-wrap" style={{ width: '1000%' }} data={data} />
        </div>
      </div>
    </div>
  );
}

export default GraphLine;