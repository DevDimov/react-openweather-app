import searchIcon from "../images/search-icon.svg"
import StatusInfo from "./StatusInfo";
import infoIcon from "../images/info-icon.svg"
import IconButton from "./IconButton";

const SearchBar = ({ locations, searchStatus, setSearchStatus, getWeather }) => {

    const search = () => {
        const input = document.getElementsByClassName('search-input')[0]
        const userInput = input.value.trim().toLowerCase()
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
                    setSearchStatus(`Loading weather data for ${userInput}`)
                    getWeather(userInput)
                    input.value = ''
                    input.focus()
                }
            }
        }
    }

    const onKeyUp = (event) => {
        if (event.charCode === 13 || event.keyCode === 13) {
            document.getElementsByClassName('search-button')[0].click()
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
                    onKeyUp={(event) => onKeyUp(event)}
                >
                </input>
                <IconButton
                    buttonClass="search-button"
                    onClick={search}
                    iconClass="search-icon"
                    iconPath={searchIcon}
                    altText="search icon"
                />
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