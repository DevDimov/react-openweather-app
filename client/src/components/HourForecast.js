import { useRef, useState } from "react";
import ScrollButton from "./ScrollButton"
import HourBlock from "./HourBlock"
import { nanoid } from 'nanoid'
import DayTabSwitch from "./DayTabSwitch";
import { getLongDayName, getDateOrdinal } from '../js/utils'
import HourDataEnd from "./HourDataEnd";

const HourForecast = ({ hourData, activeDayTab, setActiveTab, tempUnit }) => {

    const [lastDayIndex] = useState(hourData.length - 1)

    const scrollRef = useRef()

    const scroll = (shift) => {
        scrollRef.current.scrollLeft += shift
    }

    const resetScroll = () => {
        scrollRef.current.scrollLeft = -100
    }

    const getNextDayName = (dateString) => {
        let d = new Date(dateString)
        d.setDate(d.getDate() + 1)
        const shortDayName = getLongDayName(d.getDay())
        const dateOrdinal = getDateOrdinal(d.getDate())
        return shortDayName + " " + dateOrdinal
    }

    return (
        <div className="d-flex p-relative">
            <div
                className="hourly-forecast"
                ref={scrollRef}>
                {
                    hourData[activeDayTab].hourly_data.map((obj, index) => {
                        return (
                            <HourBlock
                                key={nanoid(3)}
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
                        nextDayName={getNextDayName(hourData[activeDayTab].hourly_data[0].date_string)}
                        activeDayTab={activeDayTab}
                        setActiveTab={setActiveTab}
                        resetScroll={resetScroll}
                    /> : <HourDataEnd />
                }
            </div>
            <ScrollButton
                buttonClass="scroll-button-left"
                imgClass="chevron-left"
                scroll={scroll}
                direction='left'
            />
            <ScrollButton
                buttonClass="scroll-button-right"
                imgClass="chevron-right"
                scroll={scroll}
                direction='right'
            />
        </div>
    )
}

export default HourForecast