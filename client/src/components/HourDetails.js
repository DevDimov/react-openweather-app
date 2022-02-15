import { useState, useEffect } from 'react'
import { toFahrenheit } from '../js/utils'

const HourDetails = (props) => {
    const { hourDetails, tempUnit, collapsed } = props

    const [state, setState] = useState({})

    useEffect(() => {
        if (tempUnit === 'C') {
            setState({ ...state, feelsLike: hourDetails.feels_like })
        }
        if (tempUnit === 'F') {
            const tempF = toFahrenheit(hourDetails.feels_like)
            setState({ ...state, feelsLike: tempF })
        }
    }, [hourDetails, tempUnit])


    return (
        <div className={collapsed ? "hour-details collapsed" : "hour-details"}>
            <p className="font-weight-600">{hourDetails.description}</p>
            <p>Feels like <span>{state.feelsLike}°{tempUnit}</span></p>
            <p>Cloudiness <span>{hourDetails.cloudiness}%</span></p>
            <p>Wind speed <span>{hourDetails.wind_speed} m/s</span></p>
        </div>
    )
}

export default HourDetails