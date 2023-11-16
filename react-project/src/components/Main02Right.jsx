import React from 'react'
import './Main02Right.css'
import GraphBarOne from './GraphBarOne';
import GraphLineOne from './GraphLineOne';
import GraphLineTwo from './GraphLineTwo';
import GraphLineThree from './GraphLineThree';

const Main02Right = () => {
    return (
        <div className='graph-container'>
          <GraphBarOne />
          <div className="graph-line-container">
            <GraphLineOne />
            <GraphLineTwo />
            <GraphLineThree />
          </div>
        </div>
      )
    }

export default Main02Right