import React, { useState } from 'react'

import './Main01.css'
import LiveClock from '../components/LiveClock'
import Header from '../components/Header'
import PatientTable from '../components/PatientTable'
import SuspiciousTable from '../components/SuspiciousTable'

const Main01 = () => {

    const [selectedColumn, setSelectedColumn] = useState('patient_id'); // Default column
    const [searchTerm, setSearchTerm] = useState('');
    const [susNum, setSusNum] = useState(0)
    const [patNum, setPatNum] = useState(0)

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleColumnChange = (e) => {
        setSelectedColumn(e.target.value);
    };

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