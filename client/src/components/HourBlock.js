import { useState, useEffect } from 'react'
import { toFahrenheit } from '../js/utils'
import HourDetails from "./HourDetails"

const HourBlock = ({ hourData, tempUnit, windSpeedUnit }) => {

    const [state, setState] = useState({})

    useEffect(() => {
        let newTemp, newFeelsLike
        if (tempUnit === 'C') {
            newTemp = hourData.temp
            newFeelsLike = hourData.feelsLike
        }
        if (tempUnit === 'F') {
            newTemp = toFahrenheit(hourData.temp)
            newFeelsLike = toFahrenheit(hourData.feelsLike)
        }
        setState({ ...state, temp: newTemp, feelsLike: newFeelsLike })
    }, [hourData.temp, hourData.feelsLike, tempUnit])

    const [collapsed, setCollapsed] = useState(true)

    return (
        <div className="hourly-block-container">
            <div className="hourly-block" onClick={() => setCollapsed(!collapsed)}>
                <p>{hourData.time_string}</p>
                <img 
                    className="icon"
                    src={hourData.icon}
                    alt="icon" />
                <p className="hourly-temp">{state.temp}°</p>
            </div>
            <HourDetails
                collapsed={collapsed}
                cloudiness={hourData.cloudiness}
                description={hourData.description}
                feelsLike={state.feelsLike}
                tempUnit={tempUnit}
                windSpeed={hourData.windSpeed}
                windSpeedUnit={windSpeedUnit}
            />
        </div>
    )
}

export default HourBlock