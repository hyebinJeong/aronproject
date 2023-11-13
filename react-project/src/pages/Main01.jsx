import React, { useState, useEffect, useMemo, useRef } from 'react'

import Modify from '../components/button/Modify'
import Emr from '../components/button/Emr'
import './Main01.css'
import LiveClock from '../components/LiveClock'
import iconRe from '../image/iconRe.svg'
import iconSearch from '../image/iconSearch.svg'
import List from '../components/button/List';
import ChartLine from '../components/button/ChartLine';
import Header from '../components/Header'
import PatientTable from '../components/PatientTable'
import SuspiciousTable from '../components/SuspiciousTable'
import axios from 'axios';

const Main01 = () => {

    const [datas, setDatas] = useState([]);
    //페이지 새로고침
    function refreshPage() {
        window.location.reload();
    } 

    useEffect(() => {
        axios.post('http://localhost:3001/patients', {
            // front에서 back으로 보낼 값
        }).then((res) => {
            // back에서 front으로 보낼 값
            setDatas(res.data)
            //object형태로 데이터를 받아와야하기때문이다.
        })
    }, [])
    

    const [selectedColumn, setSelectedColumn] = useState('id'); // Default column
    const [searchTerm, setSearchTerm] = useState('');

    // Handle search term change
    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Handle selected column change
    const handleColumnChange = (e) => {
        setSelectedColumn(e.target.value);
    };

    const filteredData = useMemo(() => {
        const filteredData = datas.filter((item) => {
            const columnValue = item[selectedColumn];
            if (columnValue === undefined || columnValue === null) {
                return false; // undefined 또는 null인 경우 필터링에서 제외
            }
            const stringValue = columnValue.toString().toLowerCase();
            return stringValue.includes(searchTerm.toLowerCase()) && stringValue !== '';
        });
        return filteredData;
    }, [selectedColumn, searchTerm, datas]);

    console.log(datas)

    return (
        <div>
            <Header></Header>

            <div className='space'>
                <div className='nav'>

                    <div className='nav-back'>
                        <div className='search-bar'>
                            <select name="column" id="select-column"
                            value={selectedColumn} onChange={handleColumnChange}>
                                <option value="patient_id">ID</option>
                                <option value="name">Name</option>
                            </select>
                            <input className='search-input' 
                            placeholder='검색어를 입력하세요.'
                            value={searchTerm}
                            onChange={handleSearchTermChange}></input>
                        </div>

                        <LiveClock />
                        <Modify></Modify>
                    </div>

                </div>
            </div>
            <hr />
            <div className='space'>
                {/* <div className='main-bar'>

                    <div className='status-main'>
                        <b1 className='class-status'>전체</b1>

                        <b1 className='class-status'>신규</b1>

                        <b1 className='class-status'>관찰중</b1>
                    </div>

                </div> */}
                <div className='main-table'>
                    <b1 className='class-status-font'>의심</b1>
                    <div className='sus-table-container'>
                        {filteredData && 
                            <SuspiciousTable data={filteredData}></SuspiciousTable>
                        }
                    </div>
                    <b1 className='class-status-font'>전체</b1>
                    <div className='p-table-container'>
                        {filteredData &&
                            <PatientTable data={filteredData}></PatientTable>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main01