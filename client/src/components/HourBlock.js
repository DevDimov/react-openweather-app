import { useState, useEffect } from 'react'
import { toFahrenheit } from '../js/utils'
import HourDetails from "./HourDetails"

const HourBlock = ({ time, icon, temp, hourDetails, tempUnit }) => {

    const [state, setState] = useState({

    })

    useEffect(() => {
        if (tempUnit === 'C') {
            setState({ ...state, temp: temp })
        }
        if (tempUnit === 'F') {
            const tempF = toFahrenheit(temp)
            setState({ ...state, temp: tempF })
        }
    }, [temp, tempUnit])

    const [collapsed, setCollapsed] = useState(true)

    return (
        <div className="hourly-block-container">
            <div className="hourly-block" onClick={() => setCollapsed(!collapsed)}>
                <p>{time}</p>
                <img className="icon" src={icon} alt="icon" />
                <p className="hourly-temp">{state.temp}°</p>
            </div>
            <HourDetails
                hourDetails={hourDetails}
                tempUnit={tempUnit}
                collapsed={collapsed}
            />
        </div>
    )
}

export default HourBlock