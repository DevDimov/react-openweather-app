import { useState, useEffect } from "react";
import HourForecast from './HourForecast'
import DayTabs from './DayTabs'
import styles from './LocationForecast.module.css'

const LocationForecast = ({ lang, hourData, dayData, locationName, tempUnit, windSpeedUnit }) => {

    const [activeDayTab, setActiveTab] = useState(0)

    useEffect(() => {
        setActiveTab(0)
    }, [locationName])

    return (
        <div className={styles.visible}>
            <HourForecast
                lang={lang}
                hourData={hourData}
                activeDayTab={activeDayTab}
                setActiveTab={setActiveTab}
                tempUnit={tempUnit}
                windSpeedUnit={windSpeedUnit}
            />
            <DayTabs
                lang={lang}
                dayData={dayData}
                activeDayTab={activeDayTab}
                setActiveTab={setActiveTab}
                tempUnit={tempUnit}
            />
        </div>
    )
}

export default LocationForecast