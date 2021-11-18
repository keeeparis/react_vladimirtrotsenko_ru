export const formatTime = (time, lang='ru') => {
    const format = (lang === 'ru') ? 'ru-RU' : 'en-GB'
    return new Date(time).toLocaleString(format, {
        hour:'numeric',
        minute:'numeric'
    })
}

export const timeDifference = (time, lastUpdated) => {
    let result = Math.round((Date.parse(time) - lastUpdated)/36e5)
    result = (result > -1) ? `+${result}` : result
    return result
}

export const suggestionsDefaultOptionsRU = [
    {label: 'Нур-Султан, Казахстан', value: 'Нур-Султан, Казахстан'},
    {label: 'Москва, Россия', value: 'Москва, Россия'},
    {label: 'Милан, Италия', value: 'Милан, Италия'},
    {label: 'Нью-Йорк, США', value: 'Нью-Йорк, США'},
    {label: 'Санкт-Петербург, Россия', value: 'Санкт-Петербург, Россия'},
    {label: 'Токио, Япония', value: 'Токио, Япония'},
    {label: 'Берлин, Германия', value: 'Берлин, Германия'},
]

export const suggestionsDefaultOptionsEN = [
    {label: 'Nur-Sultan, Kazakhstan', value: 'Nur-Sultan, Kazakhstan'},
    {label: 'Moscow, Russia', value: 'Moscow, Russia'},
    {label: 'Milan, Italy', value: 'Milan, Italy'},
    {label: 'New York, USA', value: 'New York, USA'},
    {label: 'Saint-Petersburg, Russia', value: 'Saint-Petersburg, Russia'},
    {label: 'Tokyo, Japan', value: 'Tokyo, Japan'},
    {label: 'Berlin, Germany', value: 'Berlin, Germany'},
]

export const calculateTime = (time, day, hour, min, sec) => {
    // const yearFind = 12*30*24*60*60*1000
    // const monthFind = 30*24*60*60*1000
    const daysFind = 24*60*60*1000
    const hourFind = 60*60*1000
    const minFind = 60*1000
    const secFind = 1000

    let remainder = time

    // if (time / yearFind > 1) {
    //     year = Math.floor(time / yearFind)
    //     remainder = time % yearFind
    // }
    // if (remainder / monthFind > 1) {
    //     month = Math.floor(remainder / monthFind)
    //     remainder = remainder % monthFind
    // }
    if (remainder / daysFind > 1) {
        day = Math.floor(remainder / daysFind)
        remainder = remainder % daysFind
    }
    if (remainder / hourFind > 1) {
        hour = Math.floor(remainder / hourFind)
        remainder = remainder % hourFind
    }
    if (remainder / minFind > 1) {
        min = Math.floor(remainder / minFind)
        remainder = remainder % minFind
    }
    if (remainder / secFind > 1) {
        sec = Math.floor(remainder / secFind)
    }

    return [day, hour, min, sec]
}

export const endsWith = (number) => {
    if (number < 15) return number
    let numberArray = number.toString()
    return +numberArray.split('')[numberArray.length - 1]
}

export const addZeroIfOneNumber = (number) => {
    return number.toString().length === 1 ? `0${number}` : number
}