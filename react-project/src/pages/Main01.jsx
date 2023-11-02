import React from 'react'
import Modify from '../components/button/Modify'
import Emr from '../components/button/Emr'
import './Main01.css'

const TableMain = () => {

    return (
        <div>

            <div className='main-bar'>

                <div className='status-main'>
                    <b1 className='all'>전체</b1>

                    <b1 className='new'>신규</b1>

                    <b1 className='obsv'>관찰중</b1>
                </div>

                <div className='btn-main'>
                    <Modify></Modify>
                    <Emr></Emr>
                </div>
            </div>
        </div>
    )
}

export default TableMain