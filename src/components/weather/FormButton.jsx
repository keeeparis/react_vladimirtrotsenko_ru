import Loader from '../UI/loader/Loader'
import Button from '../UI/button/Button'

export default function FormButton({ state, words }) {
    return (
        <div className='loader-button'>
            { 
                state === 'loading'
                ?   <Button><Loader /></Button> 
                :   <Button>{words.search}</Button>
            }
        </div>
    )
}
