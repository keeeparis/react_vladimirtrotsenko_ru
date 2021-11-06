import React from 'react'
import Loader from '../UI/loader/Loader'
import Suggestions from './Suggestions'    

export default function Form({submitForm, city, setCity, suggestions, isLoading}) {
    return (
        <form
            onSubmit={submitForm}
            className='form-weather'
        >
            <label htmlFor="city">Поиск города</label>
            <input 
                type="text" 
                value={city}
                placeholder='Введите название города...'
                onChange={e => setCity(e.target.value)}
                autoComplete='off'
            />
            <div className='loader-button'>
                {isLoading ? <Loader /> : null}
                <button className='btn'>Поиск</button>
            </div>
            <Suggestions suggestions={suggestions} setCity={setCity}/>
        </form>
    )
}
