import React, { useContext } from 'react'
import AsyncSelect from 'react-select/async'

import Loader from '../UI/loader/Loader'
import Button from '../UI/button/Button'

import ApiRequest from '../../API/ApiRequest'    
import { suggestionsDefaultOptionsEN, suggestionsDefaultOptionsRU } from '../../utils'
import { AuthContext } from '../../context/index'
import { useDictionary } from '../../hooks/dictionary.hook'

export default function Form({submitForm, setCity, label, setLabel, isLoading}) {
    const {lang} = useContext(AuthContext)
    const words = useDictionary(lang)

    const loadSuggestions = async (inputValue, callback) => {
        if (!inputValue) return
        const result = await ApiRequest.getSuggestions(inputValue)
        callback(result.suggestions.map(option => ({
            label: `${option.address?.city}, ${option.address?.country}`, 
            value: `${option.address?.city}, ${option.address?.country}`
        })))
    }

    const customeStyles = {
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

    return (
        <form
            onSubmit={submitForm}
            className='form-weather'
        >
            <AsyncSelect 
                value={label}
                defaultOptions={lang==='ru' ? suggestionsDefaultOptionsRU : suggestionsDefaultOptionsEN}
                onChange={e => {setLabel(e); setCity(e.value)}}
                loadOptions={loadSuggestions}
                className='select-suggestions'
                styles={customeStyles}
                placeholder={words.enterCity}
            />
            <div className='loader-button'>
                {isLoading 
                ?   <Button><Loader /></Button> 
                :   <Button>{words.search}</Button>}
            </div>
        </form>
    )
}
