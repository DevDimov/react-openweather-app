import { useState, useEffect } from 'react'
import Location from './components/Location'
import SearchBar from './components/SearchBar'
import StatusInfo from './components/StatusInfo'
import { getHeaderData, getHourData, getDayData, dataToFahrenheit, dataToCelcius } from './js/utils'

const App = () => {

    const [locations, setLocations] = useState([])
    const [tempUnit, setTempUnit] = useState('C')
    const [forecast, setForecast] = useState([])
    const [lastUpdated, setLastUpdated] = useState('')

    useEffect(() => {
		const locationList = JSON.parse(localStorage.getItem('weather-app-location-list'))
        if (locationList) {
		    setLocations(locationList);
		}
	}, [])

    useEffect(() => {
        if (locations.length > 0) {
            fetchApiData()
            saveToLocalStorage(locations)
        } else {
            setForecast([])
            setLastUpdated('')
        }
    }, [locations])

    useEffect(() => {
        if (forecast.length > 0 && tempUnit === 'F') {
            const newForecast = dataToFahrenheit(forecast)
            setForecast(newForecast)
        } else {
            const newForecast = dataToCelcius(forecast)
            setForecast(newForecast)
        }
    }, [tempUnit])

    const fetchApiData = async () => {
        // const url = 'http://localhost:3000/api'
        let units = ''
        if (tempUnit === 'C') {
            units='metric'
        }
        else {
            units='imperial'
        }
        // const WS_URL = 'https://weatherstack-app.herokuapp.com/api/search?q='
        
        const newForecast = []
        for (const location of locations) {
            const response = await fetch(`/api?q=${location}&units=${units}`)
            const data = await response.json()
            // console.log('API data', data)

            // Generate data for header
            const headerData = getHeaderData(data)
            // console.log('headerData', headerData)

            // Generate weather data by the hour
            const hourData = getHourData(data)
            // console.log('hourData', hourData)

            // Generate weather data by day
            const dayData = getDayData(hourData)
            // console.log('dayData', dayData)

            let apiData = {
                locationName: location,
                tempUnit: tempUnit,
                headerData: headerData,
                hourData: hourData,
                dayData: dayData
            }
            newForecast.push(apiData)
        }
        // console.log('newForecast', newForecast)
        setForecast(newForecast)
        setLastUpdated(`Last updated at ${getCurrentTime()}`)
    }

    const saveToLocalStorage = (items) => {
		localStorage.setItem('weather-app-location-list', JSON.stringify(items));
	}
    
    const removeLocation = (name) => {
        console.log('Removing location', name)
        const newLocations = locations.filter((location) => (location !== name))
        setLocations(newLocations)
        saveToLocalStorage(newLocations)
    }

    const getCurrentTime = () => {
        const date = new Date().toISOString()
        return date.split('T')[1].slice(0,5)
    }

    return (
        <div className="d-flex-center fd-column">
            <SearchBar
                locations={locations}
                setLocations={setLocations}
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
            <StatusInfo text={lastUpdated} />
        </div>
    )
}

export default App