import { useMemo } from "react"

export const useLocalStorage = (cards) => {
    useMemo(() => {
        localStorage.setItem('vtru_cards', JSON.stringify(cards))
    }, [cards])
}