import { useState, useEffect } from 'react'
import { toFahrenheit } from '../js/utils'
import globalStyles from '../css/global.module.css'
import styles from './DayTab.module.css'

const DayTab = ({ data, iconURL, setActiveTab, tabIndex, selected, tempUnit }) => {
    
    const [state, setState] = useState({})

    useEffect(() => {
        if (tempUnit === 'C') {
            setState({ ...state, maxTemp: data.maxTemp })
        }
        if (tempUnit === 'F') {
            const tempF = toFahrenheit(data.maxTemp)
            setState({ ...state, maxTemp: tempF })
        }
    }, [data, tempUnit])

    return (
        <button
            className={selected ? `${styles.button} ${styles.selected}` : styles.button}
            onClick={() => setActiveTab(tabIndex)}
        >
            <p className={globalStyles['font-weight-600']}>{data.dayName}</p>
            <div className={globalStyles['flex-center']}>
                <img
                    className={styles.icon}
                    src={iconURL}
                    alt="DayTab Icon"
                />
                <span className={globalStyles['font-weight-400']}>{`${state.maxTemp}°`}</span>
            </div>
        </button>
    )
}

export default DayTab