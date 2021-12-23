import { useContext } from 'react'
import { AuthContext } from '../../context'
import { useDictionary } from '../../hooks/dictionary.hook'

import infoIcon from '../../media/images/info.png'

export default function Helper() {
    const { lang } = useContext(AuthContext)
    const words = useDictionary(lang)

    return (
        <div className='helper'>
            <img src={infoIcon} alt="Info" />
            <div>{words.helperWeather}</div>
        </div>
    )
}
