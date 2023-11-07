import React, { useMemo, useState } from 'react'
//import할 때 useGlobalFilter 훅을 넣음
import { useTable, useGlobalFilter, useFilters, usePagination, useSortBy, useRowSelect } from 'react-table'
import FAKE_DATA from '../FAKE_DATA.json'
import { GROUPED_COLUMNS } from './columns'
import './SuspiciousTable.css'
import iconSortUp from '../image/iconSortUp.svg'
import iconSortDown from '../image/iconSortDown.svg'
import { CheckBox } from './CheckBox'


const SuspiciousTable = () => {


    const columns = useMemo(() => GROUPED_COLUMNS, [])
    const data = useMemo(() => FAKE_DATA, [])

    // const defaultColumn = useMemo(() => {
    //     return {
    //         Filter: GlobalFilter
    //     }
    // }, [])

    const { getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        //현재 페이지의 데이터
        page,
        //page 입력해서 바로가기 만들기
        prepareRow,
        // selectedFlatRows,
        //filter함수 props
        state,

    } = useTable({
        columns,
        data,
    }, useFilters,
        useGlobalFilter,
        //Sort는 filter보다 뒤에 와야 작동함. 위치 변동 하지 말 것.
        useSortBy,
        usePagination,
        useRowSelect,
        // Checkbox
        (hooks) => {
            hooks.visibleColumns.push((columns) => {
                return [
                    {
                        id: 'selection',
                        Header: ({ getToggleAllRowsSelectedProps }) => {
                            <CheckBox {...getToggleAllRowsSelectedProps()} />
                        },
                        Cell: ({ row }) => (
                            <CheckBox {...row.getToggleRowSelectedProps()} />
                        ),
                        //첫 번째 열에 체크박스를 표시
                        show: true,
                    },
                    ...columns
                ]
            })
        }
    );


    // pagination
    const { pageIndex } = state;

    return (
        <div>
            <table className='sus-table' {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup, headerIndex) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((columns, columnsIndex) => (
                                <th {...columns.getHeaderProps(columns.getSortByToggleProps())}>{columns.render('Header')}

                                    {/* sort 버튼*/}
                                    {
                                        headerIndex === 1 && columnsIndex !== 0 ?
                                            (columns.isSortedDesc ? <img src={iconSortDown} /> : <img src={iconSortUp} />) : ''}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody style={{ overflowY: 'auto', maxHeight: '300px' }} {...getTableBodyProps()}>
                    {/* page를 나타낼 거면 rows를 page로 바꾼다. */}
                    {page.map((row) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell, columnIndex) => {
                                    // console.log('row', row)
                                    // console.log('cell', row.cells)
                                    const cellClassName = columnIndex === 0 ? "row-checkbox" : "";
                                    return <td {...cell.getCellProps()} className={cellClassName}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>

            </table>

        </div >
    )
}

export default SuspiciousTable;