import React, { useMemo } from "react";
import { useTable } from "react-table";
import { COLUMNS } from "./detailPcolumns";
import '../components/SingleTable.css';

export const SingleTable = (props) => {
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => props.data, [props.data]);


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({
        columns,
        data
    });

    return (
        <>
            <table className='single-table' {...getTableProps()}>
                <thead className="single-table-head">
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th className="single-table-th" {...column.getHeaderProps()}>{column.render("Header")}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.slice(0, 1).map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td className="single-table-td" {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};
