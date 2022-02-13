import { useState, useEffect } from "react";
import HourForecast from './HourForecast'
import DayForecast from './DayForecast'
import styles from './LocationForecast.module.css'

const LocationForecast = ({ hourData, dayData, locationName, tempUnit }) => {

    const [activeDayTab, setActiveTab] = useState(0)

    useEffect(() => {
        setActiveTab(0)
    }, [locationName])

    return (
        <div className={styles.visible}>
            <HourForecast
                hourData={hourData}
                activeDayTab={activeDayTab}
                setActiveTab={setActiveTab}
                tempUnit={tempUnit}
            />
            <DayForecast
                dayData={dayData}
                activeDayTab={activeDayTab}
                setActiveTab={setActiveTab}
                locationName={locationName}
            />
        </div>
    )
}

export default LocationForecast