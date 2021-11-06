import React from 'react'
import Select from '../UI/select/Select'

export default function Filter({filter, setFilter}) {
    return (
        <div className='filter-field'>
            <div className='input-field'>
                <input 
                    type="text"
                    placeholder='Поиск...' 
                    onChange={(e) => setFilter({...filter, query: e.target.value})}
                />
            </div>
            <div className='input-field'>
                <Select
                    filter={filter}
                    setFilter={setFilter}
                    defaultValue={'Сортировка'}
                    options={[
                        {value: 'title', name: 'По названию'},
                        {value: 'body', name: 'По описанию'}
                    ]}
                />
            </div>
        </div>
    )
}
