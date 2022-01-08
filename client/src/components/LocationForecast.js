import { useState, useEffect } from "react";
import HourForecast from './HourForecast'
import DayForecast from './DayForecast'

const LocationForecast = ({ hourData, dayData, locationName, tempUnit }) => {

    const [activeDayTab, setActiveTab] = useState(0)

    useEffect(()=>{
        setActiveTab(0)
    }, [locationName])

    return (
        <div>
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