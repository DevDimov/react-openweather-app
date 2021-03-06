import { useState, useEffect } from 'react'
import { fromMStoKMH, fromMStoMPH } from '../js/utils'
import './HourDetails.css'

const HourDetails = (props) => {
    const {
        lang,
        chanceOfRain,
        showDetails,
        description,
        feelsLike,
        tempUnit,
        windSpeed,
        windSpeedUnit } = props

    const [state, setState] = useState({})

    useEffect(() => {
        let newWindSpeed
        if (windSpeedUnit === 'ms') newWindSpeed = windSpeed.toFixed()
        if (windSpeedUnit === 'kmh') newWindSpeed = fromMStoKMH(windSpeed)
        if (windSpeedUnit === 'mph') newWindSpeed = fromMStoMPH(windSpeed)
        setState({ ...state, windSpeed: newWindSpeed })
    }, [windSpeed, windSpeedUnit])

    return (
        <div className={showDetails ? "HourDetails" : "HourDetails collapsed"}>
            <p className="font-weight-600">{description}</p>
            <p>{lang.feelsLike} <span>{feelsLike}°{tempUnit}</span></p>
            <p>{lang.chanceOfRain} <span>{chanceOfRain*100}%</span></p>
            <p>{lang.windSpeed} <span>{state.windSpeed} {windSpeedUnit}</span></p>
        </div>
    )
}

export default HourDetails