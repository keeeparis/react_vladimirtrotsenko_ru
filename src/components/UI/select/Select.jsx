import React from 'react'
import Select from 'react-select'

export default function SelectCustom({filter, setFilter, defaultValue, options}) {
    // const selectMenu = useRef(null)

    // useEffect(() => {
    //     window.M.FormSelect.init(selectMenu.current)
    // })

    return (
        <Select 
            options={[
                {value: 'title', label: 'По названию'},
                {value: 'body', label: 'По описанию'}
            ]}
            onChange={e => setFilter({...filter, sort: e.value})}
            placeholder={defaultValue}
        />

        // <select
        //     ref={selectMenu}
        //     value={filter.sort}
        //     onChange={e => setFilter({...filter, sort: e.target.value})}
        // >
        //     <option value='' disabled>{defaultValue}</option>
        //     {options.map(option =>
        //         <option value={option.value} key={option.value}>{option.name}</option>    
        //     )}
        // </select>
    )
}
