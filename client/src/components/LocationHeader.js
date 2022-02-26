import { useState, useEffect } from 'react'
import { toFahrenheit } from '../js/utils'
import TempUnitSwitch from "./TempUnitSwitch"
import './LocationHeader.css'

const LocationHeader = ({ changeTempUnit, icon, name, temp, tempUnit, weather }) => {

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
                <h3>{name}</h3>
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