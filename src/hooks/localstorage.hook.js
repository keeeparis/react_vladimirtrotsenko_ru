import { useMemo } from "react"

export const useLocalStorage = (name, cards) => {
    useMemo(() => {
        localStorage.setItem(name, JSON.stringify(cards))
    }, [name, cards])
}