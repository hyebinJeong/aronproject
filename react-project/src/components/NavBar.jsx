import React from 'react'
import LiveClock from './LiveClock'
import iconRe from '../image/iconRe.svg'
import iconSearch from '../image/iconSearch.svg'
import './NavBar.css'
import List from './button/List';
import ChartLine from './button/ChartLine';


const NavBar = () => {

    function refreshPage() {
        window.location.reload();
    }

    return (
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
    )
}

export default NavBar