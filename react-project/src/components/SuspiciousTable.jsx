import React, { useMemo, useState, useEffect } from 'react'
//import할 때 useGlobalFilter 훅을 넣음
import { useTable, useGlobalFilter, useFilters, useSortBy, useRowSelect } from 'react-table'
import { COLUMNS } from './columns'
import './SuspiciousTable.css'
import iconSortUp from '../image/iconSortUp.svg'
import iconSortDown from '../image/iconSortDown.svg'
import { CheckBox } from './CheckBox'
import axios from 'axios';
import ColumnFilter from './Columnfilter'
import Modal from './CommentModal'

const SuspiciousTable = ({ selectedColumn, searchTerm, setting, setModal, setPid}) => {

    const columns = useMemo(() => {
        return COLUMNS.map((column) => {
            return {
                ...column,
                Filter: ({ column }) => <ColumnFilter column={column} selectedColumn={selectedColumn} searchTerm={searchTerm} />,
            };
        });
    }, [selectedColumn, searchTerm]);
    const [datas, setDatas] = useState([]);
    const data = useMemo(() => datas, [datas]);

    useEffect(() => {
        axios.post('http://localhost:3001/suspicious', {})
            .then((res) => {
                setDatas(res.data);
                setting(res.data.length)
            })
            .catch((error) => {
            });
    }, []);

    const { getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        //현재 페이지의 데이터
        //page 입력해서 바로가기 만들기
        prepareRow,
        // selectedFlatRows,
        //filter함수 props
    } = useTable({
        columns,
        data,
    }, useFilters,
        useGlobalFilter,
        //Sort는 filter보다 뒤에 와야 작동함. 위치 변동 하지 말 것.
        useSortBy,
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

    return (
        <div>
            <table className='sus-tb-hd' {...getTableProps()}>
                <thead >
                    {headerGroups.map((headerGroup, headerIndex) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((columns, columnsIndex) => (
                                <th className='sus-tb-column' {...columns.getHeaderProps(columns.getSortByToggleProps())}>{columns.render('Header')}

                                    {/* sort 버튼*/}
                                    {
                                        headerIndex === 1 && columnsIndex !== 0 ?
                                            (columns.isSortedDesc ? <img src={iconSortDown} /> : <img src={iconSortUp} />) : ''}
                                    {/* 열 필터 컴포넌트를 추가합니다. */}
                                    {columns.Filter ? <div>{columns.render('Filter')}</div> : null}
                                </th>
                            ))}
                            <th className='p-tb-column'>Comment</th>
                        </tr>
                    ))}
                </thead>
                <tbody  {...getTableBodyProps()}>
                    {/* page를 나타낼 거면 rows를 page로 바꾼다. */}
                    {rows.map((row, idx) => {
                        prepareRow(row)
                        return (
                            <tr  {...row.getRowProps()}>
                                {row.cells.map((cell, columnIndex) => {
                                    const cellClassName = columnIndex === 0 ? "row-checkbox" : "";
                                    return <td {...cell.getCellProps()} className={cellClassName}>{cell.render('Cell')}</td>
                                })}
                                <td><button 
                                className='table-page-col'
                                style={{color: rows[idx].original.patient_id == 9891 ? 'blue' : ''}} // comment 존재 유무에 따른 색상 변화
                                onClick={()=> {
                                     // 넣을 기능 준비
                                     setPid(rows[idx].original.patient_id)
                                     setModal(true)
                                }}>pages</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div >
    )
}

export default SuspiciousTable;