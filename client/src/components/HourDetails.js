import { useState, useEffect } from 'react'
import { fromMStoKMH, fromMStoMPH } from '../js/utils'

const HourDetails = (props) => {
    const {
        cloudiness,
        collapsed,
        description,
        feelsLike,
        tempUnit,
        windSpeed,
        windSpeedUnit } = props

    const [state, setState] = useState({})

    useEffect(() => {
        let newWindSpeed
        if (windSpeedUnit === 'ms') {
            newWindSpeed = windSpeed.toFixed()
        }
        if (windSpeedUnit === 'kmh') {
            newWindSpeed = fromMStoKMH(windSpeed)
        }
        if (windSpeedUnit === 'mph') {
            newWindSpeed = fromMStoMPH(windSpeed)
        }
        setState({ ...state, windSpeed: newWindSpeed })
    }, [windSpeed, windSpeedUnit])


    return (
        <div
            id="HourDetails"
            className={collapsed ? "hour-details collapsed" : "hour-details"}>
            <p className="font-weight-600">{description}</p>
            <p>Feels like <span>{feelsLike}°{tempUnit}</span></p>
            <p>Cloudiness <span>{cloudiness}%</span></p>
            <p>Wind speed <span>{state.windSpeed} {windSpeedUnit}</span></p>
        </div>
    )
}

export default HourDetails