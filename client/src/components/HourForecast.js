import { useRef, useState } from "react"
import HourBlock from "./HourBlock"
import DayTabSwitch from "./DayTabSwitch"
import HourDataEnd from "./HourDataEnd"
import ScrollRightButton from "./ScrollRightButton"
import ScrollLeftButton from "./ScrollLeftButton";
import './HourForecast.css'

const HourForecast = ({ hourData, activeDayTab, setActiveTab, tempUnit, windSpeedUnit }) => {

    const [lastDayIndex] = useState(hourData.length - 1)

    const scrollRef = useRef()

    return (
        <div className="display-flex p-relative">
            <div
                className="HourForecast"
                ref={scrollRef}>
                {
                    hourData[activeDayTab].hourly_data.map((obj) => {
                        return (
                            <HourBlock
                                key={obj.time_string}
                                hourData={obj}
                                tempUnit={tempUnit}
                                windSpeedUnit={windSpeedUnit}
                            />
                        )
                    })
                }
                {
                    lastDayIndex !== activeDayTab ?
                        <DayTabSwitch
                            activeDayTab={activeDayTab}
                            setActiveTab={setActiveTab}
                            dayTabDate={hourData[activeDayTab].hourly_data[0].date_string}
                            scrollRef={scrollRef}
                        /> : <HourDataEnd />
                }
            </div>
            <ScrollLeftButton scrollRef={scrollRef} />
            <ScrollRightButton scrollRef={scrollRef} />
        </div>
    )
}

export default HourForecast