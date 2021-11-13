import { useState } from "react";
import HourForecast from './HourForecast'
import DayForecast from './DayForecast'

const LocationForecast = (props) => {
    const { hourData, dayData, locationName, tempUnit } = props

    const [activeDayTab, setActiveTab] = useState(dayData[0].dayName)

    return (
        <div>
            <HourForecast
                hourData={hourData}
                activeDayTab={activeDayTab}
                tempUnit={tempUnit}
            />
            <DayForecast
                dailyMax={dayData}
                activeDayTab={activeDayTab}
                setActiveTab={setActiveTab}
                locationName={locationName}
            />
        </div>
    )
}

export default LocationForecast