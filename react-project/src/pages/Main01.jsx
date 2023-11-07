import React from 'react'
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

const Main01 = () => {
    function refreshPage() {
        window.location.reload();
    }
    return (
        <div>
            <Header></Header>

            <div className='space'>
                <div className='nav'>
                    <div className='nav-front'>
                        <List />
                        <ChartLine />
                    </div>

                    <div className='nav-back'>
                        <input className='search-bar'></input>
                        <button className='btn-search'>
                            <img className='search-icon' src={iconSearch} alt="" />
                        </button>
                        <button className='btn-re' onClick={refreshPage}>
                            <img className='re-icon' src={iconRe} alt="" />
                        </button>
                        <LiveClock />
                    </div>

                </div>
            </div>
            <hr />
            <div className='space'>
                <div className='main-bar'>

                    {/* <div className='status-main'>
                        <b1 className='class-status'>전체</b1>

                        <b1 className='class-status'>신규</b1>

                        <b1 className='class-status'>관찰중</b1>
                    </div> */}

                    <div className='btn-main'>
                        <Modify></Modify>
                        <Emr></Emr>
                    </div>

                </div>
                <div className='main-table'>
                    <b1 className='class-status-tb'>의심</b1>
                    <SuspiciousTable></SuspiciousTable>
                    <br />
                    <b1 className='class-status-tb'>전체</b1>
                    <PatientTable></PatientTable>
                </div>
            </div>
        </div>
    )
}

export default Main01