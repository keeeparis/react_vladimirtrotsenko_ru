import { useDispatch } from 'react-redux'

import Button from '../UI/button/Button'

import closeIcon from '../../media/images/close-line.svg'
import refreshIcon from '../../media/images/refresh.svg'

import { removeCard, refreshCard } from '../../features/weather-cards/cardsSlice'

export default function CardHeader({ provided, item, setLoading }) {
    const dispatch = useDispatch()

    const handleRemoveCard = () => {
        dispatch(removeCard(item.id))
    }

    const handleRefreshCard = async () => {
        try {
            setLoading(true)
            await dispatch(refreshCard(item)).unwrap()
        } catch(e) {
            console.error(e.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='card-header'>
            <Button onClick={handleRemoveCard} btn={false}>
                <img src={closeIcon} alt="close" className='close-icon'/>
            </Button>
            <Button onClick={handleRefreshCard} btn={false}>
                <img src={refreshIcon} alt="refresh" className='close-icon' />
            </Button>
            <div {...provided.dragHandleProps}>
                <i className='material-icons'>drag_handle</i>
            </div>
        </div>
    )
}
