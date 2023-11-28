import React, { useMemo } from 'react';
import { COLUMNS } from './detailallcolumns';
import './DetailAllTable.css'

const DetailAllTable = (props) => {

    const columns = useMemo(() => COLUMNS, []);
    const selectedData = useMemo(() => (props.data && props.data.length > 0) ? props.data : [], [props.data]);

    const array = ['record_time', 'sepsis_score', 'HR', 'SBP', 'DBP', 'Temp', 'O2Sat']
    return (
        <table border="1" className='detail-all-table'>
            <tbody className='detail-all-tbody'>
                <th className='detail-all-th'>
                    {columns.map((column, colIndex) => (
                        <tr className='datail-all-tr' key={colIndex}>
                            <th className="left-align-header-th">{column.Header}</th>
                        </tr>
                    ))}
                </th>
                <div className='detail-all-data-scroll'>
                    <div className='detail-all-data-div'>
                        {selectedData.map((d, idx) => (
                            <th className='detail-all-data'>
                                {columns.map((column, colIndex) => (
                                    <tr className='detail-all-data-tr'>
                                        <th className='detail-all-data-th'>{d[array[colIndex]]}</th>
                                    </tr>
                                ))}
                            </th>
                        ))}
                    </div>
                </div>
            </tbody>
        </table>
    );
};

export default DetailAllTable;
