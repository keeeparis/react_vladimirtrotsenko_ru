import React from 'react'
import Button from '../UI/button/Button'
import closeIcon from '../../media/images/close-line.svg'
import refreshIcon from '../../media/images/refresh.svg'

export default function CardHeader({removeCard, refreshData, provided, index}) {
    return (
        <div className='card-header'>
            <Button
                onClick={() => {removeCard(index)}}
                btn={false}
                color={['btn-flat', 'waves-red']}
            >
                <img src={closeIcon} alt="close" className='close-icon'/>
            </Button>
            <Button
                onClick={refreshData}
                btn={false}
                color={['btn-flat', 'waves-green']}
            >
                <img src={refreshIcon} alt="refresh" className='close-icon' />
            </Button>
            <div {...provided.dragHandleProps}>
                <i className='material-icons'>drag_handle</i>
            </div>
        </div>
    )
}
