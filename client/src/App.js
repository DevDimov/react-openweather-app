import { useState, useEffect } from 'react'

// Import functions
// import { getHeaderData, getHourData, getDayData, dataToFahrenheit, dataToCelcius } from './js/utils'
import { processData } from './js/utils'
import defaultSettings from './js/settings'
import capitals from './js/capitals'

// Import components
import Location from './components/Location'
import SearchBar from './components/SearchBar'
import StatusInfo from './components/StatusInfo'
import Settings from './components/Settings'

// Import CSS
import globalStyles from './css/global.module.css'
import styles from './App.module.css'

// Import SVGs and images
import lastUpdatedIcon from "./images/last-updated-icon.svg"

const App = () => {

    const [settings, setSettings] = useState({
        useGlobal: true,
        default: defaultSettings,
        global: defaultSettings,
        local: {}
    })
    const [state, setState] = useState({
        locations: [],
        data: [],
    })
    // const [locations, setLocations] = useState([])
    const [searchError, setSearchError] = useState('')
    const [lastUpdated, setLastUpdated] = useState('')

    useEffect(() => {
        const lastSettings = JSON.parse(localStorage.getItem('vd-weatherapp-settings'))
        if (lastSettings) {
            setSettings(lastSettings)
        }

        const locations = JSON.parse(localStorage.getItem('vd-weatherapp-locations'))
        if (locations) {
            loadLocations(locations);
        }

    }, [])

    useEffect(() => {
        localStorage.setItem('vd-weatherapp-settings', JSON.stringify(settings))
    }, [settings])

    useEffect(() => {
        localStorage.setItem('vd-weatherapp-locations', JSON.stringify(state.locations))
    }, [state.locations])

    useEffect(() => {
        if (state.data.length === 0) {
            setLastUpdated('')
        }
        else {
            setLastUpdated(`Last updated at ${getCurrentTime()}`)
        }
    }, [state.data])

    const loadLocations = async (locations) => {
        if (locations.length > 0) {
            let locationData = {}
            let locationsData = []
            try {
                for (const location of locations) {
                    locationData = await getWeather(location.id)
                    locationsData.push(locationData)
                }
                setState({ data: locationsData, locations: locations })
            }
            catch {
                setSearchError(`${locationData.message}. Error: ${locationData.cod}`)
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
                return processData(data)
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
        const newData = [...state.data, obj]
        const newLocations = [...state.locations, { name: obj.headerData.name, id: obj.headerData.id }]
        setState({ data: newData, locations: newLocations })
    }

    const removeLocation = (id) => {
        const newData = state.data.filter(obj => obj.headerData.id !== id)
        const newLocations = state.locations.filter(obj => obj.id !== id)
        setState({ data: newData, locations: newLocations })

        let newSettings = {}
        if (newLocations.length === 0) {
            newSettings = {
                ...settings,
                local: {}
            }
        }
        else if (settings.local) {
            newSettings = settings
            delete newSettings.local[id]
        }
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
            {/* {
                state.data.length > 0 &&
                <div className={styles.container}>
                    {
                        state.data.map((obj) => {
                            return (
                                <Location
                                    data={obj}
                                    id={obj.headerData.id}
                                    settings={settings}
                                    setSettings={setSettings}
                                    key={obj.headerData.id}
                                    removeLocation={removeLocation}
                                />
                            )
                        })
                    }
                </div>
            } */}
            {
                lastUpdated &&
                <StatusInfo
                    text={lastUpdated}
                    icon={lastUpdatedIcon}
                />
            }
            <Settings 
                settings={settings.global}
            />
        </div>
    )
}

export default App