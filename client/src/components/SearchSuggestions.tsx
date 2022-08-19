import { MouseEvent, MutableRefObject } from 'react'
import './SearchSuggestions.css'

type SearchBarState = {
    userInput: string,
    filteredSuggestions: string[],
    activeSuggestion: number,
    showSuggestions: boolean
}

type SearchSuggestionsProps = {
    filteredSuggestions: string[],
    activeSuggestion: number,
    setState: (obj: SearchBarState) => void,
    inputRef: MutableRefObject<HTMLInputElement>
}

export const SearchSuggestions = ({ filteredSuggestions, activeSuggestion, setState, inputRef }: SearchSuggestionsProps) => {

    const handleClick = (e: MouseEvent) => {
        setState({
            userInput: e.currentTarget.innerHTML,
            filteredSuggestions: [],
            activeSuggestion: 0,
            showSuggestions: false,
        })
        inputRef.current.focus()
    }

    return (
        <ul id="SearchSuggestions">
            {
                filteredSuggestions.map((suggestion, index) => {
                    let className: string = '';
                    if (index === activeSuggestion) {
                        className = "selected";
                    }
                    return (
                        <li
                            className={className}
                            key={suggestion}
                            onClick={handleClick}
                        >
                            {suggestion}
                        </li>
                    )
                })
            }
        </ul>
    )
}