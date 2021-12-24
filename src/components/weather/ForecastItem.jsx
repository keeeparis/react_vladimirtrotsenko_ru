import { getHours, parseISO } from 'date-fns'
import clx from 'classnames'

export default function ForecastItem({forecast, localTime, currentTemp}) {
    const todayHours = forecast.forecastday[0].hour
    const tomorrowHours = forecast.forecastday[1].hour

    const thisDayArrayOfHours = todayHours.filter(hour => getHours(parseISO(hour.time)) >= getHours(new Date(localTime)))
    const totalHours = (thisDayArrayOfHours.length < 12) 
    ?   thisDayArrayOfHours.concat(tomorrowHours.slice(0, 12 - thisDayArrayOfHours.length))
    :   thisDayArrayOfHours.slice(0, 12)

    const forecastDiv = totalHours.map((el, index) => {
        const [classes, temp] = (index === 0) 
            ? [clx('element', 'col', 's3', 'blue-grey', 'lighten-5'), currentTemp] 
            : [clx('element', 'col', 's3'), el.temp_c]
        
        return (
            <div className={classes} key={el.time}>
                <img src={el.condition.icon} alt='weather icon' />
                <p>{Math.round(temp)}&deg;</p>
                <p>{getHours(parseISO(el.time))}</p>
            </div>
        )
    })

    return (
        <div className='row'>
            {forecastDiv}
        </div>
    )
}
