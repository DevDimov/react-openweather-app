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

const LocationControls = ({ localTempUnit, localView, changeTempUnit, changeView, location, removeLocation }) => {

    return (
        <div className={styles['location-controls']}>

            <button
                name="temp-switch"
                className={styles.button}
                onClick={() => changeTempUnit()}
            >
                <img
                    className={styles.icon}
                    src={localTempUnit === 'C' ? tempIconC : tempIconF}
                    alt="" />
            </button>

            <button
                name="change-view"
                className={styles.button}
                onClick={() => changeView()}
            >
                <img
                    className={styles.icon}
                    src={localView === 'detailed' ? expandButton : compressButton}
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