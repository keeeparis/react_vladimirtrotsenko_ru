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