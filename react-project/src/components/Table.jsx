import React, { useMemo } from 'react'
//import할 때 useGlobalFilter 훅을 넣음
import { useTable, useGlobalFilter, useFilters, useSortBy } from 'react-table'
import FAKE_DATA from '../FAKE_DATA.json'
import { GROUPED_COLUMNS } from './columns'
import './Table.css'
import { GlobalFilter } from './GlobalFilter'
import iconSortUp from '../image/iconSortUp.svg'
import iconSortDown from '../image/iconSortDown.svg'


const Table = () => {
    const columns = useMemo(() => GROUPED_COLUMNS, [])
    const data = useMemo(() => FAKE_DATA, [])

    const defaultColumn = useMemo(() => {
        return {
            Filter: GlobalFilter
        }
    }, [])

    const { getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        //filter함수 props
        state,
        setGlobalFilter
    } = useTable({
        columns,
        data,
    }, useFilters,
        useGlobalFilter,
        //Sort는 filter보다 뒤에 와야 작동함. 위치 변동 하지 말 것.
        useSortBy);

    //파싱한 globalFilter값
    const { globalFilter } = state

    return (
        <div>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>

                            {/* 빈 체크박스 컬럼 자리 */}
                            <th></th>

                            {headerGroup.headers.map((columns) => (
                                <th {...columns.getHeaderProps(columns.getSortByToggleProps())}>{columns.render('Header')}

                                    {/* sort 버튼*/}
                                    {/* {columns.isSorted ? (columns.isSortedDesc ? <img src={iconSortDown} /> : <img src={iconSortUp} />) : ' '} */}
                                    {columns.isSortedDesc ? <img src={iconSortDown} /> : <img src={iconSortUp} />}

                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>

                                {/* 컬럼 체크박스 */}
                                <td className='row-checkbox'>
                                    <input className='table-checkbox' type='checkbox'></input>
                                </td>

                                {row.cells.map((cell) => {
                                    // console.log('row', row)
                                    // console.log('cell', row.cells)
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div >
    )
}

export default Table;