import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import '../components/SingleTable.css';
import { SingleTable } from "./SingleTable";
import { PdfTable } from "./PdfTable";
import aronImg from '../image/aronImg.png';

const PdfFile = ({ pid, startDate, endDate }) => {

    const [filteredData, setFilteredData] = useState([]);
    // const pid = props.pid;

    //SingleTable 데이터
    const [datas, setDatas] = useState([]);


    useEffect(() => {
        axios.post('http://localhost:3001/detail/info', {
            // front에서 back으로 보낼 값
            patient_id: pid,

        }).then((res) => {
            // back에서 front으로 보낼 값
            setDatas(res.data)
            //object형태로 데이터를 받아와야하기때문이다.
        })
    }, [])


    // PdfTable 데이터
    const [data2, setData2] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.post('http://localhost:3001/detail/alldata', { patient_id: pid });
            if (pid !== null && startDate !== null && endDate !== null) {
                const start = new Date(startDate);
                start.setHours(0, 0, 0, 0);
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999);  // endDate를 해당 날짜의 종료 시점으로 설정

                const filteredData = response.data.filter(d => {
                    const recordTime = new Date(d.record_time);
                    return recordTime >= start && recordTime <= end;
                });
                setData2(filteredData);
            } else {
                setData2(response.data);
            }
        };

        fetchData();
    }, [pid, startDate, endDate]);



    return (
        <>
            <div style={{
                display: 'flex', justifyContent: 'center', width: "100%"
            }}>
                <img src={aronImg} alt="aronImg" style={{ width: "40%" }} />
            </div >

            <SingleTable data={datas} />


            <PdfTable datum={data2} />



        </>
    )
}

export default PdfFile;