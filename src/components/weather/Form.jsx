import React from 'react'
import Suggestions from './Suggestions'    

export default function Form({submitForm, city, setCity, suggestions}) {
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
            <button>Поиск</button>
            <Suggestions suggestions={suggestions} setCity={setCity}/>
        </form>
    )
}
