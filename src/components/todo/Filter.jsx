import React, { useContext } from 'react'
import SelectCustom from '../UI/select/Select'
import {AuthContext} from '../../context/index'
import { useDictionary } from '../../utils/dictionary'

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
                <SelectCustom
                    filter={filter}
                    setFilter={setFilter}
                    defaultValue={words.sorting}
                    options={[
                        {value: 'title', label: words.byName},
                        {value: 'body', label: words.byDescription}
                    ]}
                />
            </div>
        </div>
    )
}
