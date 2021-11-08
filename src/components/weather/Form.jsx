import React, { useContext } from 'react'
import Loader from '../UI/loader/Loader'
import Button from '../UI/button/Button'
import AsyncSelect from 'react-select/async'
import ApiRequest from '../../API/ApiRequest'    
import { suggestionsDefaultOptionsEN, suggestionsDefaultOptionsRU } from '../../utils'
import {AuthContext} from '../../context/index'
import { useDictionary } from '../../utils/dictionary'

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
                placeholder={words.enterCity}
            />
            <div className='loader-button'>
                {isLoading 
                ? <Button><Loader /></Button> 
                : <Button>{words.search}</Button>}
            </div>
        </form>
    )
}
