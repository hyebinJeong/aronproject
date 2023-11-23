import React from "react";
import { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import "./ModalGraph.css";
import axios from "axios";
import '../components/SingleTable.css';
import { SingleTable } from "./SingleTable";
import { PdfTable } from "./PdfTable";
import aronImg from '../image/aronImg.png';

const PdfFile = (props) => {


    const pid = props.pid;

    //SingleTable 데이터
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        axios.post('http://localhost:3001/detail/info', {
            // front에서 back으로 보낼 값
            patient_id: pid
        }).then((res) => {
            // back에서 front으로 보낼 값
            setDatas(res.data)
            console.log(datas)
            //object형태로 데이터를 받아와야하기때문이다.
        })
    }, [])


    // sepsis_score 데이터 / graph 데이터 전달
    const [sepsis_score, showSepsis_score] = useState(true);

    // axios주소 가져오게 되면
    const [DBdata, setDBdata] = useState([]);

    // 데이터 받아옴
    useEffect(() => {
        axios
            .post("http://localhost:3001/detail/graph", {
                patient_id: pid
            })
            .then((res) => {
                console.log("res", res);
                setDBdata(res.data);
            });
    }, []);

    const originalData = [
        // DB에서 받아온 정보를 map함수로 반복처리
        {
            id: "sepsis_score",
            color: "hsl(211, 70%, 50%)",
            data: DBdata.map((d) => ({ x: d.record_time, y: d.sepsis_score })),
        }

    ];

    let data = originalData.filter((d) => {
        if (d.id === "sepsis_score" && sepsis_score) return true;
        return false;
    });

    const MyResponsiveLine = ({ data }) => (
        <ResponsiveLine
            data={data}
            margin={{ top: 50, right: 90, bottom: 50, left: 50 }}
            xScale={{ type: "point" }}
            yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: false,
                reverse: false,
            }}
            yFormat=' >-.2f'
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
            enableSlices='x'
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


    // 두번째 테이블 데이터
    const [data2, setData2] = useState([]);
    useEffect(() => {
        axios.post('http://localhost:3001/detail/alldata', {
            // front에서 back으로 보낼 값
            patient_id: pid
        }).then((res) => {
            // back에서 front으로 보낼 값
            setData2(res.data)
            //object형태로 데이터를 받아와야하기때문이다.
        })
    }, [])

    return (
        <>
            <div style={{
                display: 'flex', justifyContent: 'center', width: "100%"
            }}>
                <img src={aronImg} alt="aronImg" style={{ width: "40%" }} />
            </div >

            <SingleTable data={datas} />
            {/* 그래프 */}
            <div className='modal-graph-size'>
                <MyResponsiveLine className='modal-detail-graph-wrap' data={data} />
            </div>
            <PdfTable datum={data2} />



        </>
    )
}

export default PdfFile;