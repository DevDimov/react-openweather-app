import { useState, useEffect } from 'react'
import { toFahrenheit } from '../js/utils'
import './DayTab.css'

const DayTab = ({ dayTabName, data, iconURL, setActiveTab, tabIndex, selected, tempUnit }) => {

    const [state, setState] = useState({})

    useEffect(() => {
        let newTemp
        if (tempUnit === 'C') newTemp = data.maxTemp
        if (tempUnit === 'F') newTemp = toFahrenheit(data.maxTemp)
        setState({ ...state, maxTemp: newTemp })
    }, [data, tempUnit])

    return (
        <button
            className={selected ? "DayTab DayTab--selected" : "DayTab"}
            onClick={() => setActiveTab(tabIndex)}
        >
            <p className='DayTab__name'>{dayTabName}</p>
            <div className='flex-center'>
                <img className="DayTab__icon" src={iconURL} alt=""/>
                <p className="DayTab__temp">{state.maxTemp}°</p>
            </div>
        </button>
    )
}

export default DayTab