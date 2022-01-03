import { useRef } from "react";
import ScrollButton from "./ScrollButton"
import HourBlock from "./HourBlock"
import { nanoid } from 'nanoid'

const HourForecast = (props) => {
    const { hourData, activeDayTab, tempUnit } = props
    const activeDayData = hourData.filter((element) => element.weekDay === activeDayTab)[0]
    const scrollRef = useRef()

    const scroll = (shift) => {
        scrollRef.current.scrollLeft += shift
    }

    return (
        <div className="d-flex p-relative">
            <div
                className="hourly-forecast"
                ref={scrollRef}>
                {
                    activeDayData.hourly_data.map((obj, index) => {
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