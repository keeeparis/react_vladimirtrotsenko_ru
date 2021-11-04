import React from 'react'

export default function Suggestions({suggestions, setCity}) {
    return (
        <ul className='suggestions-list'>
            {suggestions 
            ?   suggestions.map((suggestion, index) => 
                    <li className='suggestion-item' key={index} onClick={e => setCity(e.target.innerText)}>
                        {suggestion.address?.city}, {suggestion.address?.country}
                    </li>
                )
            :   null
            }
        </ul>
    )
}
