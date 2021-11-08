import React, { useContext } from 'react'
import Loader from '../UI/loader/Loader'
import Button from '../UI/button/Button'
import AsyncSelect from 'react-select/async'
import ApiRequest from '../../API/ApiRequest'    
import { suggestionsDefaultOptionsEN, suggestionsDefaultOptionsRU } from '../../utils'
import {AuthContext} from '../../context/index'

export default function Form({submitForm, setCity, label, setLabel, isLoading}) {
    const {lang} = useContext(AuthContext)
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
                placeholder={lang==='ru'?'Введите город...':'Search city...'}
            />
            <div className='loader-button'>
                {isLoading 
                ? <Button>{lang==='ru'?<><Loader /></>:<><Loader /></>}</Button> 
                : <Button>{lang==='ru'?<>Поиск</>:<>Search</>}</Button>}
            </div>
        </form>
    )
}
