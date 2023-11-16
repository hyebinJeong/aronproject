import React, { useMemo, useState, useEffect } from 'react'
//import할 때 useGlobalFilter 훅을 넣음
import { useTable, useGlobalFilter, useFilters, usePagination, useSortBy, useRowSelect } from 'react-table'
import { useNavigate } from 'react-router-dom'
import { COLUMNS } from './columns'
import './PatientTable.css'
import iconSortUp from '../image/iconSortUp.svg'
import iconSortDown from '../image/iconSortDown.svg'
import { CheckBox } from './CheckBox'
import axios from 'axios';
import ColumnFilter from './Columnfilter.jsx'

const PatientTable = ({ modal, selectedColumn, searchTerm, setting, setModal, setPid , pid}) => {

    const columns = useMemo(() => {
        return COLUMNS.map((column) => {
            return {
                ...column,
                Filter: ({ column }) => <ColumnFilter column={column} selectedColumn={selectedColumn} searchTerm={searchTerm} />,
                // 나머지 컬럼 설정
            };
        });
    }, [selectedColumn, searchTerm]);
    const [datas, setDatas] = useState([]);
    const data = useMemo(() => datas, [datas]);
    const [commentArr, setCommentArr] = useState();

    const nav = useNavigate();

    useEffect(() => {
        axios.post('http://localhost:3001/patients', {})
            .then((res) => {
                setDatas(res.data);
                setting(res.data.length)
            })
            .catch((error) => {
            });
    }, []);

    // 

    const { getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        //현재 페이지의 데이터
        page,
        //다음 페이지로 이동하는 함수
        nextPage,
        //이전 페이지로 이동하는 함수
        previousPage,
        //다음 페이지로 이동 가능한지 여부
        canNextPage,
        //이전 페이지로 이동 가능한지 여부
        canPreviousPage,
        //총 페이지 수
        gotoPage,
        pageCount,
        //page 입력해서 바로가기 만들기
        prepareRow,
        // selectedFlatRows,
        //filter함수 props
        state,
    } = useTable({
        columns,
        data,
        initialState: { pageIndex: 0 }
    }, useFilters,
        useGlobalFilter,
        //Sort는 filter보다 뒤에 와야 작동함. 위치 변동 하지 말 것.
        useSortBy,
        usePagination,
        useRowSelect,
        // Checkbox
        (hooks) => {
            hooks.visibleColumns.push((columns) => [
                {
                    id: 'selection',
                    Header: ({ getToggleAllRowsSelectedProps }) => <CheckBox {...getToggleAllRowsSelectedProps()} />,
                    Cell: ({ row }) => <CheckBox {...row.getToggleRowSelectedProps()} />,
                },
                ...columns,
            ]);
        }
    );

    // pagination
    const { pageIndex } = state;

    const pageRange = 10;
    const startPage = Math.max(0, pageIndex - pageIndex % pageRange);
    const endPage = Math.min(pageCount, startPage + pageRange);

    const handleNextTenPages = () => {
        if (canNextPage) {
            gotoPage(Math.min(pageIndex + 10, pageCount - 1));
        }
    };

    const handlePreviousTenPages = () => {
        if (canPreviousPage) {
            gotoPage(Math.max(pageIndex - 10, 0));
        }
    };

    const classifyComment = async () => {
        await axios.post('http://localhost:3001/comment/classify').then((res) => {
            setCommentArr(res.data.map((d) => d.patient_id))
            console.log('res', res.data)
        })
    }

    useEffect(() => {
        classifyComment()
    }, [pid])

    useEffect(() => {
        if (modal == false) {
            classifyComment()
            console.log('modal state is modify')
        }
        
    }, [modal, commentArr])

    return (
        <div>

            <table className='p-tb' {...getTableProps()}>
                <thead className='p-tb-thead'>
                    {headerGroups.map((headerGroup, headerIndex) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((columns, columnsIndex) => (
                                <th className='p-tb-column' {...columns.getHeaderProps(columns.getSortByToggleProps())}>{columns.render('Header')}

                                    {/* sort 버튼*/}
                                    {
                                        headerIndex === 1 && columnsIndex !== 0 ?
                                            (columns.isSortedDesc ? <img src={iconSortDown} /> : <img src={iconSortUp} />) : ''}
                                    {/* 열 필터 컴포넌트를 추가합니다. */}
                                    {columns.Filter ? <div>{columns.render('Filter')}</div> : null}
                                </th>
                                
                            ))}
                            <th className='p-tb-column'>Comment
                            
                            </th>
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {/* page를 나타낼 거면 rows를 page로 바꾼다. */}
                    {page.map((row, idx) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()} onDoubleClick={() => {
                                nav('/detailpage')
                            }}>
                                {row.cells.map((cell, columnIndex) => {
                                    const cellClassName = columnIndex === 0 ? "row-checkbox" : "";
                                    return <td {...cell.getCellProps()} className={cellClassName}>{cell.render('Cell')}</td>
                                })}
                                <td><button 
                                className='table-page-col'
                                onClick={()=> {
                                     // 넣을 기능 준비
                                     console.log('commentArr:', commentArr); // 추가된 부분
                                     console.log('row.original.patient_id:', row.original.patient_id); // 추가된 부분
                                     setPid(row.original.patient_id)
                                     setModal(true)
                                }}>{
                                    commentArr.includes(row.original.patient_id) ? 'pages' : 'none'
                                }</button></td>
                                
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className='btn-page-container'>

                <button className='btn-page' onClick={handlePreviousTenPages} disabled={!canPreviousPage}>{'<<'}</button>
                <button className='btn-page' onClick={() => previousPage()} disabled={!canPreviousPage}>{'<'}</button>
                <span>

                    {Array(endPage - startPage)
                        .fill()
                        .map((_, index) => (
                            <button
                                className='btn-num-page'
                                key={startPage + index}
                                type="button"
                                style={{
                                    backgroundColor: pageIndex === index ? "#0d47a1" : "transparent",
                                    color: pageIndex === index ? "white" : 'black'
                                }}
                                onClick={() => gotoPage(startPage + index)}
                            >
                                {startPage + index + 1}
                            </button>
                        ))}
                </span>
                <button className='btn-page' onClick={() => nextPage()} disabled={!canNextPage}>{'>'}</button>
                <button className='btn-page' onClick={handleNextTenPages} disabled={!canNextPage}>{'>>'}</button>
            </div>
        </div >
    )
}

export default PatientTable;