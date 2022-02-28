import { useState, useEffect } from 'react'
import { toFahrenheit } from '../js/utils'
import styles from './DayTab.module.css'

const DayTab = ({ data, iconURL, setActiveTab, tabIndex, selected, tempUnit }) => {

    const [state, setState] = useState({})

    useEffect(() => {
        let newTemp
        if (tempUnit === 'C') {
            newTemp = data.maxTemp
        }
        if (tempUnit === 'F') {
            newTemp = toFahrenheit(data.maxTemp)
        }
        setState({ ...state, maxTemp: newTemp })
    }, [data, tempUnit])

    return (
        <button
            className={selected ? `${styles.button} ${styles.selected}` : styles.button}
            onClick={() => setActiveTab(tabIndex)}
        >
            <p className='font-weight-600'>{data.dayName}</p>
            <div className='flex-center'>
                <img
                    className={styles.icon}
                    src={iconURL}
                    alt="DayTab Icon"
                />
                <span className='font-weight-400'>{state.maxTemp}°</span>
            </div>
        </button>
    )
}

export default DayTab