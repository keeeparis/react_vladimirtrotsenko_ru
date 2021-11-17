import { useState, useCallback } from "react"

export const useFetching = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(null)

    const request = useCallback( async(url) => {
        try {
            setIsLoading(true)
            const res = await url()
            return res
        } catch (e) {
            setIsError(e.message)
        } finally {
            setIsLoading(false)
        }
    }, [])

    const clearError = () => {setIsError(null)}

    return {request, isLoading, isError, clearError, setIsError}
}