import { useEffect, useState, useRef } from 'react'
import './SearchBar.css'
import searchIcon from "../images/search-icon.svg"
import StatusInfo from "./StatusInfo";
import infoIcon from "../images/info-icon.svg"
import { SearchSuggestions } from "./SearchSuggestions";

const SearchBar = ({ lang, langValue, getWeather, locations, suggestions, searchError, setData }) => {

    const [state, setState] = useState({
        userInput: '',
        filteredSuggestions: [],
        activeSuggestion: 0,
        showSuggestions: false
    })
    const [searchStatus, setSearchStatus] = useState('')
    const inputRef = useRef()

    useEffect(() => {
        setSearchStatus('')
        setState({ ...state, userInput: '' })
    }, [locations])

    useEffect(() => {
        setSearchStatus(searchError)
    }, [searchError])

    const handleChange = (e) => {
        const userInput = e.currentTarget.value;
        let re = new RegExp(userInput, 'i');
        let matches = suggestions.filter((city) => (city.search(re) > -1))
        setState({
            userInput: userInput,
            filteredSuggestions: matches,
            activeSuggestion: 0,
            showSuggestions: true
        })
    }

    const handleKeyDown = (e) => {
        const { activeSuggestion, filteredSuggestions } = state

        // User pressed the enter key
        if (e.keyCode === 13) {
            if (filteredSuggestions.length) {
                setState({
                    userInput: filteredSuggestions[activeSuggestion],
                    filteredSuggestions: [],
                    activeSuggestion: 0,
                    showSuggestions: false
                })
            }
            else {
                handleSearch()
            }
        }

        // User pressed the up arrow
        else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return
            }
            setState({ ...state, activeSuggestion: activeSuggestion - 1 })
        }

        // User pressed the down arrow
        else if (e.keyCode === 40) {
            if (activeSuggestion + 1 === filteredSuggestions.length) {
                return
            }
            setState({ ...state, activeSuggestion: activeSuggestion + 1 })
        }
    }

    const handleSearch = async () => {
        const userInput = state.userInput.trim()
        if (userInput.length < 3) {
            setSearchStatus(lang.search.invalidInput)
        }
        else {
            const re = new RegExp(userInput, 'i')
            let matches = locations.filter((city) => (city.name.search(re) > -1))
            if (matches.length) {
                setSearchStatus(lang.search.duplicate)
            }
            else {
                if (locations.length >= 3) {
                    setSearchStatus(lang.search.limit)
                }
                else {
                    setSearchStatus(`${lang.search.load} ${state.userInput}`)
                    const data = await getWeather('cityName', userInput, langValue)
                    if (data.hourData) {
                        setData(data)
                    }
                    else {
                        setSearchStatus(`${data.statusText}, ${data.status}`)
                    }
                }
            }
        }
    }

    return (
        <div className="flex-center-column">
            <div className="SearchBar">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder={lang.search.placeholder}
                    className="SearchBar-input"
                    maxLength="40"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    value={state.userInput}
                >
                </input>
                <button className="SearchBar-button" onClick={handleSearch}>
                    <img
                        className="SearchBar-icon"
                        src={searchIcon}
                        alt=""
                    />
                </button>
                {
                    state.showSuggestions && state.userInput && state.filteredSuggestions &&
                    <SearchSuggestions
                        filteredSuggestions={state.filteredSuggestions}
                        activeSuggestion={state.activeSuggestion}
                        setState={setState}
                        inputRef={inputRef}
                    />
                }
            </div>
            {searchStatus && <StatusInfo
                text={searchStatus}
                icon={infoIcon}
            />}
        </div>
    )
}

export default SearchBar