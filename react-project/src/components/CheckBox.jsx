import React from 'react'
import './PatientTable.css'

export const CheckBox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef
    React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
        <>
            <input className='row-checkBox' type='checkbox' ref={resolvedRef}{...rest}></input>
        </>
    )
})