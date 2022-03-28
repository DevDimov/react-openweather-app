import { useState, useEffect } from 'react'
import { toFahrenheit } from '../js/utils'
import HourDetails from "./HourDetails"
import './HourBlock.css'

const HourBlock = ({ lang, hourData, tempUnit, windSpeedUnit }) => {

    const [state, setState] = useState({})
    const [showDetails, setShowDetails] = useState(false)

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

    return (
        <div className="display-flex">
            <div
                className="HourBlock"
                onClick={() => setShowDetails(!showDetails)}
            >
                <p>{hourData.time_string}</p>
                <img
                    className="HourBlock-icon"
                    src={hourData.icon}
                    alt="" />
                <p className="font-weight-600">{state.temp}°</p>
            </div>
            <HourDetails
                lang={lang}
                showDetails={showDetails}
                chanceOfRain={hourData.chanceOfRain}
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