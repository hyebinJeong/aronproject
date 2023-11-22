import React, { useState, useEffect } from 'react'

import './Main01.css'
import LiveClock from '../components/LiveClock'
import PatientTable from '../components/PatientTable'
import SuspiciousTable from '../components/SuspiciousTable'
import Modal from '../components/CommentModal'
import axios from 'axios'

const Main01 = () => {

    const [selectedColumn, setSelectedColumn] = useState('patient_id'); // Default column
    const [searchTerm, setSearchTerm] = useState('');
    const [susNum, setSusNum] = useState(0)
    const [patNum, setPatNum] = useState(0)

    const [modal, setModal] = useState(false)
    const [pid, setPid] = useState()
    const [commentArr, setCommentArr] = useState();

    const [susAxios, setSusAxios] = useState(false);
    const [patAxios, setPatAxios] = useState(false);


    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleColumnChange = (e) => {
        setSelectedColumn(e.target.value);
    };

    const classifyComment = async () => {
        await axios.post('http://localhost:3001/comment/classify').then((res) => {
            setCommentArr(res.data.map((d) => d.patient_id))
        })
    }

    const axiosAlert = async () => {
        await setSusAxios(true)
        await setPatAxios(true)
    }


    useEffect(() => {
        classifyComment()
    }, [])

    useEffect(() => {
        if (modal == false) {
            classifyComment()
        }

    }, [])

    useEffect(() => {
        axios.post('http://localhost:5000/model', {}, { withCredentials: true })
            .then((res) => {
                axiosAlert()
            })
            .catch((error) => {
            });
    }, [])


    return (
        <div style={{ position: 'relative' }}>
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
                        <SuspiciousTable
                            selectedColumn={selectedColumn}
                            searchTerm={searchTerm}
                            setting={setSusNum}
                            setModal={setModal}
                            setPid={setPid}
                            pid={pid}
                            classifyComment={classifyComment}
                            commentArr={commentArr}
                            susAxios = {susAxios}
                            setSusAxios = {setSusAxios}></SuspiciousTable>

                    </div>
                    <p className='class-status-font'>전체({patNum})</p>
                    <div className='p-table-container'>
                        <PatientTable
                            selectedColumn={selectedColumn}
                            searchTerm={searchTerm}
                            setting={setPatNum}
                            setModal={setModal}
                            setPid={setPid}
                            pid={pid}
                            classifyComment={classifyComment}
                            commentArr={commentArr}
                            patAxios = {patAxios}
                            setPatAxios = {setPatAxios}></PatientTable>

                    </div>
                </div>
            </div>
            {modal
                ? <Modal setModal={setModal} pid={pid} classifyComment={classifyComment}></Modal>
                : null}
        </div>
    )
}

export default Main01