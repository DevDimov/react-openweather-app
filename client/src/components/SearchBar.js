import { useState, useEffect } from "react";
import searchIcon from "../images/search-icon.svg"
import StatusInfo from "./StatusInfo";

const SearchBar = ({ locations, setLocations }) => {

    const [searchStatus, setSearchStatus] = useState('')
    const [state, setState] = useState()
    
    useEffect(() => {
        if (locations.length >= 3) {
            setState('disabled')
        }
        else {
            setState('enabled')
        }
        setSearchStatus('')
    }, [locations])

    const search = () => {
        if (state === 'disabled') {
            setSearchStatus('Sorry, the app supports up to 3 locations only')
        }
        else {
            const input = document.getElementsByClassName('search-input')[0]
            const value = input.value.trim().toLowerCase()
            if (value.length > 2) {
                if (!locations.includes(value)) {
                    setLocations([...locations, value])
                    input.value = ''
                    input.focus()
                    setSearchStatus(`Loading weather data for ${value}`)
                }
                else {
                    setSearchStatus('Location already exists')
                }
            }
            else {
                input.focus()
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
                >
                </input>
                <button
                    className="search-button"
                    onClick={search}
                >
                    <img
                        className="search-icon"
                        src={searchIcon}
                        alt="search icon"
                    />
                </button>
            </div>
            <StatusInfo text={searchStatus} />
        </div>
    )
}

export default SearchBar