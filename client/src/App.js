import { useState, useEffect } from 'react'

// Import functions
import { processData, getCurrentTime } from './js/utils'
import capitals from './js/capitals'
import defaultSettings from './js/settings'
import languages from './js/languages'

// Import components
import Location from './components/Location'
import SearchBar from './components/SearchBar'
import StatusInfo from './components/StatusInfo'
import Settings from './components/Settings'

// Import CSS
import './App.css'

// Import SVGs and images
import lastUpdatedIcon from "./images/last-updated-icon.svg"

const App = () => {

    const [settings, setSettings] = useState({
        default: defaultSettings,
        global: defaultSettings,
        local: {}
    })

    const [state, setState] = useState({
        locations: [],
        data: [],
    })

    const [searchError, setSearchError] = useState('')
    const [lastUpdated, setLastUpdated] = useState('')
    const [lang, setLang] = useState(languages[settings.global.lang])

    useEffect(() => {
        const lastSettings = JSON.parse(localStorage.getItem('vd-weatherapp-settings'))
        if (lastSettings) {
            setSettings(lastSettings)
        }

        const locations = JSON.parse(localStorage.getItem('vd-weatherapp-locations'))
        if (locations) {
            loadLocations(locations, lastSettings.global.lang);
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
            setLastUpdated(`${lang.lastUpdated} ${getCurrentTime()}`)
        }
    }, [state.data])

    useEffect(() => {
        setLang(languages[settings.global.lang])
        loadLocations(state.locations, settings.global.lang)
    }, [settings.global.lang])

    const loadLocations = async (locations, langValue) => {
        if (locations.length > 0) {
            let locationData = {}
            let locationsData = []
            try {
                for (const location of locations) {
                    locationData = await getWeather('cityID', location.id, langValue)
                    locationsData.push(locationData)
                }
                setState({ data: locationsData, locations: locations })
            }
            catch {
                setSearchError(`${locationData.message}, ${locationData.cod}`)
            }
        }
    }

    const getWeather = async (method, location, langValue) => {
        let response = ''
        
        // Uncomment the below if statements for production
        if (method === 'cityName') {
            response = await fetch(`/api?q=${location}&lang=${langValue}`)
        }
        if (method === 'cityID') {
            response = await fetch(`/api?id=${location}&lang=${langValue}`)
        }

        // response = await fetch('testDataLeedsApr22.json') // For dev only

        if (response.status >= 200 && response.status <= 299) {
            const data = await response.json()
            if (data.cnt > 0) {
                return processData(data)
            }
            else {
                return {
                    status: data.cod,
                    statusText: data.message
                }
            }
        } else {
            return {
                status: 500,
                statusText: lang.serverError
            }
        }
    }

    const setData = (obj) => {
        const newData = [obj, ...state.data]
        const newLocations = [{ name: obj.headerData.name, id: obj.headerData.id }, ...state.locations]
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
        setSettings(newSettings)
    }

    return (
        <div id='App'>
            <SearchBar
                lang={lang}
                langValue={settings.global.lang}
                locations={state.locations}
                getWeather={getWeather}
                searchError={searchError}
                setData={setData}
                suggestions={capitals}
            />
            {
                state.data.length > 0 && state.data.map((obj) => {
                    return (
                        <Location
                            lang={lang}
                            key={obj.headerData.id}
                            id={obj.headerData.id}
                            data={obj}
                            settings={settings}
                            setSettings={setSettings}
                            removeLocation={removeLocation}
                        />
                    )
                })
            }
            {
                lastUpdated &&
                <StatusInfo
                    text={lastUpdated}
                    icon={lastUpdatedIcon}
                />
            }
            <Settings
                lang={lang}
                settings={settings}
                setSettings={setSettings}
            />
        </div>
    )
}

export default App