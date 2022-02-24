import { useEffect, useState, useRef } from 'react'
import searchIcon from "../images/search-icon.svg"
import StatusInfo from "./StatusInfo";
import infoIcon from "../images/info-icon.svg"
import IconButton from "./IconButton";
import { SearchSuggestions } from "./SearchSuggestions";

const SearchBar = ({ getWeather, locations, suggestions, searchError, setData }) => {

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

    const onKeyDown = (e) => {
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
                search()
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

    const search = async () => {
        const userInput = state.userInput.trim()
        if (userInput.length < 3) {
            setSearchStatus('Please enter a valid location name')
        }
        else {
            const re = new RegExp(userInput, 'i')
            let matches = locations.filter((city) => (city.name.search(re) > -1))
            if (matches.length) {
                setSearchStatus('Location already exists')
            }
            else {
                if (locations.length >= 3) {
                    setSearchStatus('Sorry, the app supports up to 3 locations only')
                }
                else {
                    setSearchStatus(`Loading weather data for ${state.userInput}`)
                    const data = await getWeather(userInput)
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
        <div className="d-flex-center fd-column">
            <div className="search-bar d-flex">
                <input
                    ref={inputRef}
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