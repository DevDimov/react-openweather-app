export const SearchSuggestions = ({ filteredSuggestions, activeSuggestion, onClick }) => {
    return (
        <ul id="search-suggestions">
            {
                filteredSuggestions.map((suggestion, index) => {
                    let className;
                    if (index === activeSuggestion) {
                        className = "selected";
                    }
                    return (
                        <li
                            className={className}
                            key={suggestion}
                            onClick={onClick}
                        >
                            {suggestion}
                        </li>
                    )
                })
            }
        </ul>
    )
}