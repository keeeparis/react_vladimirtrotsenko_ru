import React from 'react'
import Card from './Card'

export default function List({cards, remove}) {
    return (
        <div className='city-list'>
            {cards.map(card =>
                <Card 
                    city={card.city}
                    location={card.location}
                    current={card.current}
                    lastUpdated={card.lastUpdated}
                    remove={remove}
                    key={card.city}
                />
            )}
        </div>
    )
}
