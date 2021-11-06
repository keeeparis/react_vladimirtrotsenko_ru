import React, { useRef } from 'react'
import { useEffect } from 'react'

export default function Select({filter, setFilter, defaultValue, options}) {
    const selectMenu = useRef(null)

    useEffect(() => {
        window.M.FormSelect.init(selectMenu.current)
    })

    return (
        <select
            ref={selectMenu}
            value={filter.sort}
            onChange={e => setFilter({...filter, sort: e.target.value})}
        >
            <option value='' disabled>{defaultValue}</option>
            {options.map(option =>
                <option value={option.value} key={option.value}>{option.name}</option>    
            )}
        </select>
    )
}
