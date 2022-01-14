import { MouseEvent, MutableRefObject } from 'react'

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

    const handleOnClick = (e: MouseEvent) => {
        setState({
            userInput: e.currentTarget.innerHTML,
            filteredSuggestions: [],
            activeSuggestion: 0,
            showSuggestions: false,
        })
        inputRef.current.focus()
    }

    return (
        <ul id="search-suggestions">
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
                            onClick={handleOnClick}
                        >
                            {suggestion}
                        </li>
                    )
                })
            }
        </ul>
    )
}