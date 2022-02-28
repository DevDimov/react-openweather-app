import { useState, useEffect } from 'react'
import { toFahrenheit } from '../js/utils'
import TempUnitSwitch from "./TempUnitSwitch"
import './LocationHeader.css'

const LocationHeader = ({ changeTempUnit, icon, name, country, temp, tempUnit, weather }) => {

    const [state, setState] = useState({})

    useEffect(() => {
        let newTemp
        if (tempUnit === 'C') {
            newTemp = temp
        }
        if (tempUnit === 'F') {
            newTemp = toFahrenheit(temp)
        }
        setState({ ...state, temp: newTemp })
    }, [temp, tempUnit])

    return (
        <div id='LocationHeader'>
            <div>
                {/* <span */}
                    {/* className="location-name"> */}
                    <h3>{`${name}, ${country}`}</h3>
                {/* </span> */}
                {/* <span
                    className="country-code">
                    {', ' + country}
                </span> */}
                <p>{weather}</p>
            </div>

            <div className='right-column'>
                <div className="display-flex">
                    <div className="icon-info">
                        <img
                            id='LocationHeader-icon'
                            src={icon}
                            alt="icon"
                        />
                        <h3 id='LocationHeader-temp'>{state.temp}°</h3>
                    </div>
                    <TempUnitSwitch
                        tempUnit={tempUnit}
                        changeTempUnit={changeTempUnit}
                    />
                </div>
                <p>Currently</p>
            </div>
        </div>
    )
}

export default LocationHeader