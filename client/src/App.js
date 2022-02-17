import { useState, useEffect } from 'react'

// Import functions
import { getHeaderData, getHourData, getDayData, dataToFahrenheit, dataToCelcius } from './js/utils'
import capitals from './js/capitals'

// Import components
import Location from './components/Location'
import SearchBar from './components/SearchBar'
import StatusInfo from './components/StatusInfo'

// Import CSS
import globalStyles from './css/global.module.css'
import styles from './App.module.css'

// Import SVGs and images
import lastUpdatedIcon from "./images/last-updated-icon.svg"

const App = () => {

    const [state, setState] = useState({
        lastUpdated: '',
        locations: [],
        data: [],
    })

    const [globalSettings, setGlobalSettings] = useState({})
    const [searchError, setSearchError] = useState('')
    const [lastUpdated, setLastUpdated] = useState('')

    useEffect(() => {
        const settings = JSON.parse(localStorage.getItem('weather-app-global-settings'))
        if (settings) {
            setGlobalSettings(settings)
        }
        const localSettings = JSON.parse(localStorage.getItem('weather-app-local-settings'))
        if (!localSettings) {
            const newSettings = {
                tempUnit: 'C',
                view: 'detailed'
            }
            setGlobalSettings(newSettings)
            saveGlobalSettings(newSettings)
        }

        const locationList = JSON.parse(localStorage.getItem('weather-app-location-list'))
        if (locationList) {
            loadLocations(locationList);
        }

    }, [])

    useEffect(() => {
        if (state.data.length === 0) {
            setLastUpdated('')
        }
        else {
            setLastUpdated(`Last updated at ${getCurrentTime()}`)
        }
    }, [state.data])

    const loadLocations = async (locationList) => {
        if (locationList.length > 0) {
            let newForecast = []
            let data = {}
            try {
                for (const location of locationList) {
                    data = await getWeather(location)
                    newForecast.push(data)
                }
                setState({ ...state, data: newForecast, locations: locationList })
            }
            catch {
                setSearchError(`${data.message}. Error: ${data.cod}`)
            }
        }
    }

    const getWeather = async (location) => {
        let response = ''
        if (process.env.NODE_ENV === 'production') {
            // response = await fetch(`/api?q=${location}&units=${units}`)
            response = await fetch(`/api?q=${location}`)
        }
        else {
            response = await fetch('testDataNewYork.json') // For dev only
        }

        if (response.status >= 200 && response.status <= 299) {
            const data = await response.json()
            if (data.cnt > 0) {
                // console.log(data)
                return data
            }
            else {
                // console.log(data)
                return {
                    status: data.cod,
                    statusText: data.message
                }
            }
        } else {
            // console.log(response.status, response.statusText)
            return {
                status: 500,
                statusText: 'Internal server error'
            }
        }
    }

    const setData = (obj) => {
        const newData = [obj, ...state.data]
        const newLocations = [obj.city.name, ...state.locations]
        setState({ ...state, data: newData, locations: newLocations })
        saveToLocalStorage(newLocations)
    }

    const saveToLocalStorage = (items) => {
        localStorage.setItem('weather-app-location-list', JSON.stringify(items));
    }

    const saveGlobalSettings = (obj) => {
        localStorage.setItem('weather-app-global-settings', JSON.stringify(obj));
    }

    const removeLocation = (name) => {
        const newLocations = state.locations.filter((location) => (location !== name))
        const newData = state.data.filter((obj) => (obj.city.name !== name))
        setState({ ...state, locations: newLocations, data: newData })
        saveToLocalStorage(newLocations)
    }

    const getCurrentTime = () => {
        const date = new Date().toISOString()
        return date.split('T')[1].slice(0, 5)
    }

    // const changeGlobalTempUnit = () => {
    //     let newUnit = ''
    //     if (state.globalTempUnit === 'C') {
    //         newUnit = 'F'
    //     }
    //     if (state.globalTempUnit === 'F') {
    //         newUnit = 'C'
    //     }
    //     let newSettings = settings
    //     newSettings.global.tempUnit = newUnit
    //     setSettings(newSettings)
    //     saveSettings(newSettings)
    // }

    return (
        <div className={styles['main-container']}>
            <SearchBar
                locations={state.locations}
                getWeather={getWeather}
                searchError={searchError}
                setData={setData}
                suggestions={capitals}
            />
            {
                state.data.length > 0 &&
                <div className={styles.container}>
                    {
                        state.data.map((obj, index) => {
                            return (
                                <Location
                                    data={obj}
                                    globalSettings={globalSettings}
                                    index={index}
                                    location={obj.city.name}
                                    key={obj.city.id}
                                    removeLocation={removeLocation}
                                />
                            )
                        })
                    }
                </div>
            }
            {
                lastUpdated &&
                <StatusInfo
                    text={lastUpdated}
                    icon={lastUpdatedIcon}
                />
            }
        </div>
    )
}

export default App