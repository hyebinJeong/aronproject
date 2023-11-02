import React, { Component } from 'react'
import Clock from 'react-live-clock';
import './LiveClock.css'

class LiveClock extends Component {
    render() {
        return (
            <div>
                {/* format 부분에서 원하는 날짜 형식으로 변경 가능, 타임존 변경 가능 */}
                <Clock className='live-clock' format={'YYYY 년 MM 월 DD 일 HH:mm:ss'} ticking={true} timezone={'Rok'} />
            </div>
        )
    }
}
export default LiveClock;