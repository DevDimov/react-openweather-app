import { useState, useEffect } from 'react'
import { toFahrenheit } from '../js/utils'
import CityDetails from "./CityDetails"
import TempUnitSwitch from "./TempUnitSwitch"
import styles from './LocationHeader.module.css'

const LocationHeader = ({ changeTempUnit, icon, name, temp, tempUnit, weather }) => {

    const [state, setState] = useState({})

    useEffect(() => {
        if (tempUnit === 'C') {
            setState({ ...state, temp: temp })
        }
        if (tempUnit === 'F') {
            const tempF = toFahrenheit(temp)
            setState({ ...state, temp: tempF })
        }
    }, [temp, tempUnit])

    // const [showDetails, setShowDetails] = useState(false)

    // useEffect(() => {
    //     setShowDetails(false)
    // }, [headerData])

    return (
        <div className={styles.container}>
            <div>
                <button
                    id={styles['city-data']}
                // onClick={() => setShowDetails(true)}
                >
                    <h3>{name}</h3>
                </button>
                <p>{weather}</p>
            </div>
            <div className={styles['right-column']}>
                <div className="d-flex">
                    <div className="d-flex f-wrap icon-info">
                        <img
                            className={styles.icon}
                            src={icon}
                            alt="icon"
                        />
                        <h3 id={styles.temp}>{state.temp}°</h3>
                    </div>
                    <TempUnitSwitch
                        tempUnit={tempUnit}
                        changeTempUnit={changeTempUnit}
                    />
                </div>
                <p>Currently</p>
            </div>

            {/* <CityDetails
                display={showDetails}
                setShowDetails={setShowDetails}
                headerData={headerData}
            /> */}
        </div>
    )
}

export default LocationHeader