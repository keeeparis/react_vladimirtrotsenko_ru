import Loader from '../UI/loader/Loader'
import Button from '../UI/button/Button'

export default function FormButton({ status, words }) {
    return (
        <div className='loader-button'>
            { 
                status === 'loading'
                ?   <Button><Loader /></Button> 
                :   <Button>{words.search}</Button>
            }
        </div>
    )
}
