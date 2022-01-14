import { useRef, useState } from "react"
import HourBlock from "./HourBlock"
import DayTabSwitch from "./DayTabSwitch"
import HourDataEnd from "./HourDataEnd"
import ScrollRightButton from "./ScrollRightButton"
import ScrollLeftButton from "./ScrollLeftButton";

const HourForecast = ({ hourData, activeDayTab, setActiveTab, tempUnit }) => {

    const [lastDayIndex] = useState(hourData.length - 1)

    const scrollRef = useRef()

    return (
        <div className="d-flex p-relative">
            <div
                className="hourly-forecast"
                ref={scrollRef}>
                {
                    hourData[activeDayTab].hourly_data.map((obj) => {
                        return (
                            <HourBlock
                                key={obj.time_string}
                                time={obj.time_string}
                                icon={obj.icon}
                                temp={obj.temp}
                                tempUnit={tempUnit}
                                hourDetails={obj}
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