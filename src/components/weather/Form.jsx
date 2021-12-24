import React, { useContext, useState } from 'react'
import AsyncSelect from 'react-select/async'
import { useDispatch } from 'react-redux'

import ApiRequest from '../../API/ApiRequest'  
import FormButton from './FormButton'
  
import { suggestionsDefaultOptionsEN, suggestionsDefaultOptionsRU } from '../../utils'
import { AuthContext } from '../../context/index'
import { useDictionary } from '../../hooks/dictionary.hook'
import { addNewCard } from '../../features/weather-cards/cardsSlice'

const selectStyles = {
    option: (provided, state) => ({
        ...provided,
        boxShadow: 'inset 2px 0px #A63B35'
    }),
    control: (provided, state) => ({
        ...provided,
        borderColor: '#A63B35 !important',
        boxShadow: '5px 5px #A63B35',
        borderRadius: '0'
    })
}

export default function Form({ status }) {
    const [cityname, setCityname] = useState('')
    const [label, setLabel] = useState('')

    const { lang } = useContext(AuthContext) 
    const words = useDictionary(lang)

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addNewCard({ city: cityname }))
        setLabel('')
        setCityname('')
    }

    const handleSelectDefaultOptions = (lang) => 
        lang === 'ru' ? suggestionsDefaultOptionsRU : suggestionsDefaultOptionsEN

    const handleSelectChange = (e) => {
        setCityname(e.value)
        setLabel(e)
    }

    const handleLoadingSuggestions = async (inputValue, callback) => {
        if (!inputValue) return
        const result = await ApiRequest.getSuggestions(inputValue)
        callback(result.suggestions.map(option => ({
            label: `${option.address.city}, ${option.address.country}`, 
            value: `${option.address.city}, ${option.address.country}`
        })))
    }

    return (
        <form
            onSubmit={handleSubmit}
            className='form-weather'
        >
            <AsyncSelect 
                value={label}
                defaultOptions={handleSelectDefaultOptions(lang)}
                onChange={handleSelectChange}
                loadOptions={handleLoadingSuggestions}
                className='select-suggestions'
                styles={selectStyles}
                placeholder={words.enterCity}
            />
            <FormButton status={status} words={words} />
        </form>
    )
}
