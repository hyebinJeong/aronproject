// useAsyncDebounce와 useState 입력.
import React, { useState } from 'react'
import { useAsyncDebounce } from 'react-table'

export const GlobalFilter = ({ filter, setFilter }) => {
    const [value, setValue] = useState(filter)

    //onChange 핸들러에 useAsyncDebounce훅을 담아준다.
    const onChange = useAsyncDebounce(value => {
        setFilter(value || undefined)
    }, 1000)

    return (
        <span>
            Search:{' '}
            {/* 전체 필터, 글자 입력과 동시에 검색*/}
            {/* <input value={filter || ''}
                onChange={(e) => setFilter(e.target.value)} /> */}
            {/*  */}
            <input
                value={value || ''}
                onChange={(e) => {
                    setValue(e.target.value)
                    onChange(e.target.value)
                }
                } />
        </span>
    )
}