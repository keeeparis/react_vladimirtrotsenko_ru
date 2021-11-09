import React, { useContext } from 'react'
import Select from 'react-select'
import { AuthContext } from '../../context/index'
import { useDictionary } from '../../hooks/dictionary.hook'

export default function Filter({filter, setFilter}) {
    const {lang} = useContext(AuthContext)
    const words = useDictionary(lang)

    return (
        <div className='filter-field'>
            <div className='input-field'>
                <input 
                    type="text"
                    placeholder={words.searching}
                    onChange={(e) => setFilter({...filter, query: e.target.value})}
                />
            </div>
            <div className='input-field'>
                <Select 
                    options={[
                        {value: 'title', label: words.byName},
                        {value: 'body', label: words.byDescription}
                    ]}
                    onChange={e => setFilter({...filter, sort: e.value})}
                    placeholder={words.sorting}
                />
            </div>
        </div>
    )
}
