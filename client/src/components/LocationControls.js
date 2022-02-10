import { useState, useRef } from 'react'

import tempIconC from '../images/temp-icon-c.svg'
import tempIconF from '../images/temp-icon-f.svg'
import expandButton from '../images/expand-button.svg'
import compressButton from '../images/compress-button.svg'
import removeButton from '../images/remove-button.svg'

import styles from './LocationControls.module.css'

// type LocationStateObj = {
//     temp: string,
//     view: string
// }

// type LocationControlsProps = {
//     locationState: LocationStateObj,
//     setLocationState: (obj: LocationStateObj) => void,
//     location: string,
//     removeLocation: (name: string) => void
// }

// type ChangeViewParams = {
//     state: ,
//     setState: ,
//     locationState: LocationStateObj,
//     setLocationState: (obj: LocationStateObj) => void,
// }

const LocationControls = ({ locationState, setLocationState, location, removeLocation }) => {

    const changeView = () => {
        if (locationState.view === 'detailed') {
            setLocationState({ ...locationState, view: 'compact' })
        }

        if (locationState.view === 'compact') {
            setLocationState({ ...locationState, view: 'detailed' })
        }
    }

    const changeTempUnit = () => {
        if (locationState.localTempUnit === 'C') {
            setLocationState({ ...locationState, localTempUnit: 'F' })
        }

        if (locationState.localTempUnit === 'F') {
            setLocationState({ ...locationState, localTempUnit: 'C' })
        }
    }

    return (
        <div className={styles['location-controls']}>

            <button
                name="temp-switch"
                className={styles.button}
                onClick={() => changeTempUnit()}
            >
                <img
                    className={styles.icon}
                    src={locationState.localTempUnit === 'C' ? tempIconC : tempIconF}
                    alt="" />
            </button>

            <button
                id="change-view"
                className={styles.button}
                onClick={() => changeView()}
            >
                <img
                    className={styles.icon}
                    src={locationState.view === 'detailed' ? compressButton : expandButton}
                    alt="" />
            </button>

            <button
                name="remove-location"
                className={styles.button}
                onClick={() => removeLocation(location)}
            >
                <img
                    className={styles.icon}
                    src={removeButton}
                    alt="" />
            </button>
        </div>
    )
}

export default LocationControls