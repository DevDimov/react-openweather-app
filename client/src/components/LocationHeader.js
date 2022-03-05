import { useState, useEffect } from 'react'
import { toFahrenheit } from '../js/utils'
import TempUnitSwitch from "./TempUnitSwitch"
import './LocationHeader.css'

const LocationHeader = ({ lang, changeTempUnit, icon, name, country, temp, tempUnit, weather }) => {

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
                <h3>{`${name}, ${country}`}</h3>
                <p>{weather.charAt(0).toUpperCase() + weather.slice(1)}</p>
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
                <p>{lang.currently}</p>
            </div>
        </div>
    )
}

export default LocationHeader