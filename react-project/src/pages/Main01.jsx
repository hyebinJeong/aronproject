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

    // const [datas, setDatas] = useState([]);
    const [selectedColumn, setSelectedColumn] = useState('id'); // Default column
    const [searchTerm, setSearchTerm] = useState('');

    const [susNum, setSusNum] = useState(0)
    const [patNum, setPatNum] = useState(0)

    // // localStorage에서 데이터를 가져오는 함수
    // const getStoredData = () => {
    //     const storedData = localStorage.getItem('filteredData');
    //     return storedData ? JSON.parse(storedData) : [];
    // };

    // // localStorage에 데이터를 설정하는 함수
    // const setStoredData = (data) => {
    //     localStorage.setItem('filteredData', JSON.stringify(data));
    // };


    // useEffect(() => {
    //     // localStorage에서 데이터를 가져와서 업데이트
    //     const storedData = getStoredData();
    //     if (storedData.length > 0) {
    //         setDatas(storedData);
    //     }
    // }, []); // 두 번째 매개변수로 빈 배열을 전달하여 한 번만 실행되도록 함
    
    // useEffect(() => {
    //     axios.post('http://localhost:3001/patients', {})
    //         .then((res) => {
    //             console.log('API로부터 받은 데이터:', res.data);
    //             setDatas(res.data);
    //             setStoredData(res.data);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching data:', error);
    //         });
    // }, []);

    // Handle search term change
    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Handle selected column change
    const handleColumnChange = (e) => {
        setSelectedColumn(e.target.value);
    };

    // const filteredData = useMemo(() => {
    //     const newData = datas.length > 0 ? datas : getStoredData();
    
    //     const filteredData = newData.filter((item) => {
    //         const columnValue = item[selectedColumn];
    //         if (columnValue === undefined || columnValue === null) {
    //             return false;
    //         }
    //         const stringValue = columnValue.toString().toLowerCase();
    //         return stringValue.includes(searchTerm.toLowerCase()) && stringValue !== '';
    //     });
    
    //     console.log('filteredData:', filteredData);
    
    //     return filteredData;
    // }, [selectedColumn, searchTerm, datas]);


    return (
        <div>
            <Header></Header>

            <div className='space'>
                <div className='nav'>

                    <div className='nav-back'>
                        <div className='search-bar'>
                            <select name="column" id="select-column"
                            value={selectedColumn} 
                            onChange={handleColumnChange}
                            >
                                <option value="patient_id">ID</option>
                                <option value="name">Name</option>
                            </select>
                            <input className='search-input' 
                            placeholder='검색어를 입력하세요.'
                            value={searchTerm}
                            onChange={handleSearchTermChange}></input>
                        </div>

                        <LiveClock />
                        {/* <Modify></Modify> */}
                    </div>

                </div>
            </div>
            <hr />
            <div className='space'>
                <div className='main-table'>
                    <p className='class-status-font'>의심({susNum})</p>
                    <div className='sus-table-container'>
                        <SuspiciousTable selectedColumn={selectedColumn} searchTerm={searchTerm} setting={setSusNum}></SuspiciousTable>
                        
                    </div>
                    <p className='class-status-font'>전체({patNum})</p>
                    <div className='p-table-container'>
                        <PatientTable selectedColumn={selectedColumn} searchTerm={searchTerm} setting={setPatNum} ></PatientTable>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main01