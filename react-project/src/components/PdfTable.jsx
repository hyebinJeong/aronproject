import React, { useMemo } from 'react';
import { COLUMNS } from './detailallcolumns'

export const PdfTable = (props) => {
    const columns = useMemo(() => COLUMNS, []);
    const selectedData = useMemo(() => (props.datum && props.datum.length > 0) ? props.datum : [], [props.datum]);

    return (
        <table style={{ borderCollapse: 'collapse', width: '100%', margin: '5% 0 0 0' }}>
            <thead
                style={{ color: "white", backgroundColor: "#0d47a1", textAlign: "center" }}>
                <tr style={{ border: "1px solid #ddd" }}>
                    {columns.map(column => (
                        <th style={{ border: "1px solid #ddd", height: "30px" }} key={column.accessor}>
                            {column.Header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {selectedData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map(column => (
                            <td key={column.accessor} style={{ border: '1px solid #ddd', padding: '8px', textAlign: "center" }}>
                                {row[column.accessor]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>

        </table >
    )
}