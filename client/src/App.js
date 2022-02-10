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

    const [locations, setLocations] = useState([])
    const [tempUnit, setTempUnit] = useState('C')
    const [forecast, setForecast] = useState([])
    const [searchError, setSearchError] = useState('')
    const [lastUpdated, setLastUpdated] = useState('')

    useEffect(() => {
        const locationList = JSON.parse(localStorage.getItem('weather-app-location-list'))
        if (locationList) {
            loadLocations(locationList);
        }
    }, [])

    useEffect(() => {
        if (forecast.length > 0 && tempUnit === 'F') {
            const newForecast = dataToFahrenheit(forecast)
            setForecast(newForecast)
        }
        else if (forecast.length > 0 && tempUnit === 'C') {
            const newForecast = dataToCelcius(forecast)
            setForecast(newForecast)
        }
    }, [tempUnit])

    useEffect(() => {
        if (locations.length === 0) {
            setLastUpdated('')
        }
        else {
            setLastUpdated(`Last updated at ${getCurrentTime()}`)
        }
    }, [locations])

    const loadLocations = async (locationList) => {
        if (locationList.length > 0) {
            let newForecast = []
            let data = {}
            try {
                for (const location of locationList) {
                    data = await getWeather(location)
                    newForecast.push(data)
                }
                setForecast(newForecast)
                setLocations(locationList)
            }
            catch {
                setSearchError(`${data.message}. Error: ${data.cod}`)
            }
        }
    }

    const getTempUnits = () => {
        if (tempUnit === 'C') {
            return 'metric'
        }
        return 'imperial'
    }

    const getWeather = async (location) => {
        const units = getTempUnits()
        
        let response = ''
        if (process.env.NODE_ENV === 'production') {
            response = await fetch(`/api?q=${location}&units=${units}`)
        }
        else {
            response = await fetch('testDataNewYork.json') // For dev only
        }
        
        if (response.status >= 200 && response.status <= 299) {
            const data = await response.json()
            if (data.cnt > 0) {
                const headerData = getHeaderData(data)
                const hourData = getHourData(data)
                const dayData = getDayData(hourData)
                const newForecast = {
                    locationName: location,
                    tempUnit: tempUnit,
                    headerData: headerData,
                    hourData: hourData,
                    dayData: dayData
                }
                // console.log('newForecast', newForecast)
                return newForecast
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

    const updateForecast = (location, newForecast) => {
        addLocation(location)
        setForecast([newForecast, ...forecast])
    }

    const saveToLocalStorage = (items) => {
        localStorage.setItem('weather-app-location-list', JSON.stringify(items));
    }

    const addLocation = (location) => {
        const newLocations = [location, ...locations]
        setLocations(newLocations)
        saveToLocalStorage(newLocations)
    }

    const removeLocation = (name) => {
        const newLocations = locations.filter((location) => (location !== name))
        const newForecast = forecast.filter((forecast) => (forecast.locationName !== name))
        setLocations(newLocations)
        setForecast(newForecast)
        saveToLocalStorage(newLocations)
    }

    const getCurrentTime = () => {
        const date = new Date().toISOString()
        return date.split('T')[1].slice(0, 5)
    }

    return (
        <div className="d-flex-center fd-column">
            <SearchBar
                locations={locations}
                getWeather={getWeather}
                searchError={searchError}
                updateForecast={updateForecast}
                suggestions={capitals}
            />
            {
                forecast.length > 0 &&
                <div className={styles.container}>
                    {
                        forecast.map((obj) => {
                            return (
                                <Location
                                    key={obj.headerData.id}
                                    location={obj.locationName}
                                    data={obj}
                                    tempUnit={tempUnit}
                                    setTempUnit={setTempUnit}
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