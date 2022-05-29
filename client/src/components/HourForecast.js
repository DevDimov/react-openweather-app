import { useRef, useState } from "react"
import HourBlock from "./HourBlock"
import DayTabSwitch from "./DayTabSwitch"
import HourDataEnd from "./HourDataEnd"
import ScrollButtonRight from "./ScrollButtonRight"
import ScrollButtonLeft from "./ScrollButtonLeft";
import './HourForecast.css'

const HourForecast = ({ lang, hourData, activeDayTab, setActiveTab, tempUnit, windSpeedUnit }) => {

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
                                lang={lang}
                                key={obj.dateString.split(' ')[1].slice(0, 5)}
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
                            lang={lang}
                            activeDayTab={activeDayTab}
                            setActiveTab={setActiveTab}
                            dayTabDate={hourData[activeDayTab].hourly_data.at(-1).dateString}
                            scrollRef={scrollRef}
                        /> :
                        <HourDataEnd
                            lang={lang}
                        />
                }
            </div>
            <ScrollButtonLeft scrollRef={scrollRef} />
            <ScrollButtonRight scrollRef={scrollRef} />
        </div>
    )
}

export default HourForecast