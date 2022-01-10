import { useState } from 'react'
import searchIcon from "../images/search-icon.svg"
import StatusInfo from "./StatusInfo";
import infoIcon from "../images/info-icon.svg"
import IconButton from "./IconButton";
import { SearchSuggestions } from "./SearchSuggestions";

const SearchBar = ({ suggestions, locations, searchStatus, setSearchStatus, getWeather }) => {

    const [state, setState] = useState({
        userInput: "",
        filteredSuggestions: [],
        activeSuggestion: 0,
        showSuggestions: false
    })

    const onChange = (e) => {
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

    const onClick = (e) => {
        setState({
            userInput: e.currentTarget.innerText,
            filteredSuggestions: [],
            activeSuggestion: 0,
            showSuggestions: false,
        })
        document.querySelector('.search-input').focus()
    }

    const onKeyDown = (e) => {
        const { activeSuggestion, filteredSuggestions } = state
        // User pressed the enter key
        if (e.keyCode === 13) {
            if (state.showSuggestions) {
                setState({
                    userInput: filteredSuggestions[activeSuggestion],
                    filteredSuggestions: [],
                    activeSuggestion: 0,
                    showSuggestions: false
                })
            }
            else {
                document.querySelector('.search-button').click()
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

    const search = () => {
        const userInput = state.userInput.toLowerCase()
        if (userInput.length < 3) {
            setSearchStatus('Please enter a valid location name')
        }
        else {
            if (locations.includes(userInput)) {
                setSearchStatus('Location already exists')
            }
            else {
                if (locations.length >= 3) {
                    setSearchStatus('Sorry, the app supports up to 3 locations only')
                }
                else {
                    setSearchStatus(`Loading weather data for ${state.userInput}`)
                    getWeather(userInput)
                    setState({ userInput: '' })
                }
            }
        }
    }

    return (
        <div className="d-flex-center fd-column">
            <div className="search-bar d-flex">
                <input
                    type="text"
                    placeholder="Enter a location here"
                    className="search-input"
                    maxLength="40"
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={state.userInput}
                >
                </input>
                <IconButton
                    buttonClass="search-button"
                    onClick={search}
                    iconClass="search-icon"
                    iconPath={searchIcon}
                    altText="search icon"
                />
                {
                    state.showSuggestions && state.userInput && state.filteredSuggestions &&
                    <SearchSuggestions
                        filteredSuggestions={state.filteredSuggestions}
                        activeSuggestion={state.activeSuggestion}
                        onClick={onClick}
                    />
                }
            </div>
            <StatusInfo
                display={searchStatus !== '' ? true : false}
                text={searchStatus}
                icon={infoIcon}
            />
        </div>
    )
}

export default SearchBar