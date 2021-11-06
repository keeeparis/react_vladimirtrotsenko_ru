export const formatTime = (time) => {
    return new Date(time).toLocaleString('en-GB', {
        year: 'numeric',
        month: 'long',
        day:'numeric',
        hour:'numeric',
        minute:'numeric'
    })
}

export const timeDifference = (time, lastUpdated) => {
    let result = Math.round((Date.parse(time) - +`${lastUpdated}000`)/36e5)
    result = (result > -1) ? `+${result}` : result
    return result
}