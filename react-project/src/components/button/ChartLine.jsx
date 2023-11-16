import React from "react";
import iconChart from "../../image/iconChart.svg";
import "./ChartLine.css";

const ChartLine = () => {
    return (
        <button className="btn-chart">
            <img className="chart-icon" src={iconChart} alt="" />
        </button>
    );
};

export default ChartLine;
