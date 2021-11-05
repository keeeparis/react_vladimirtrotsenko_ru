export const formatTime = (time) => {
    return new Date(time).toLocaleString('en-GB', {
        year: 'numeric',
        month: 'long',
        day:'numeric',
        hour:'numeric',
        minute:'numeric'
    })
}

export const timeDifference = (time) => {
    return Math.floor((Date.now() - Date.parse(time))/36e5)
}