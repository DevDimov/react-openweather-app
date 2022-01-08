import { useState, useEffect } from 'react'
import Location from './components/Location'
import SearchBar from './components/SearchBar'
import StatusInfo from './components/StatusInfo'
import { getHeaderData, getHourData, getDayData, dataToFahrenheit, dataToCelcius } from './js/utils'
import lastUpdatedIcon from "./images/last-updated-icon.svg"

const App = () => {

    const [locations, setLocations] = useState([])
    const [tempUnit, setTempUnit] = useState('C')
    const [forecast, setForecast] = useState([])
    const [searchStatus, setSearchStatus] = useState('')
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

    const loadLocations = async (locationList) => {
        if (locationList.length > 0) {
            const units = getTempUnits()
            let newForecast = []
            let data = {}
            try {
                for (const location of locationList) {
                    const response = await fetch('testDataNewYork.json') // For dev only
                    // const response = await fetch(`/api?q=${location}&units=${units}`)
                    data = await response.json()
                    
                    const headerData = getHeaderData(data)
                    const hourData = getHourData(data)
                    const dayData = getDayData(hourData)
                    let apiData = {
                        locationName: location,
                        tempUnit: tempUnit,
                        headerData: headerData,
                        hourData: hourData,
                        dayData: dayData
                    }
                    newForecast.push(apiData)
                }
                setForecast(newForecast)
                setLocations(locationList)
                setLastUpdated(`Last updated at ${getCurrentTime()}`)
            }
            catch {
                setSearchStatus(`Error: ${data.cod}, ${data.message}`)
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
        let data = {}
        const newLocations = [location, ...locations]
        try {
            const response = await fetch('testDataNewYork.json') // For dev only
            // const response = await fetch(`/api?q=${location}&units=${units}`)
            data = await response.json()

            const headerData = getHeaderData(data)
            const hourData = getHourData(data)
            const dayData = getDayData(hourData)
            let newForecast = {
                locationName: location,
                tempUnit: tempUnit,
                headerData: headerData,
                hourData: hourData,
                dayData: dayData
            }
            console.log('newForecast', newForecast)
            setForecast([newForecast, ...forecast])
            setLocations(newLocations)
            saveToLocalStorage(newLocations)
            setSearchStatus('')
            setLastUpdated(`Last updated at ${getCurrentTime()}`)
        }
        catch {
            setSearchStatus(`Error: ${data.cod}, ${data.message}`)
        }
    }

    const saveToLocalStorage = (items) => {
        localStorage.setItem('weather-app-location-list', JSON.stringify(items));
    }

    const removeLocation = (name) => {
        const newLocations = locations.filter((location) => (location !== name))
        const newForecast = forecast.filter((forecast) => (forecast.locationName !== name))
        setLocations(newLocations)
        setForecast(newForecast)
        saveToLocalStorage(newLocations)
        setSearchStatus('')
        if (newForecast.length === 0) {
            setLastUpdated('')
        }
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
                searchStatus={searchStatus}
                setSearchStatus={setSearchStatus}
            />
            <div className="container d-flex-center fd-column">
                {
                    forecast.map((obj, index) => {
                        return (
                            <Location
                                key={index}
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
            <StatusInfo 
                display={lastUpdated !== '' ? true : false}
                text={lastUpdated}
                icon={lastUpdatedIcon} 
            />
        </div>
    )
}

export default App