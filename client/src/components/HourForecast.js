import { useEffect, useRef } from "react"
import ScrollButton from "./ScrollButton"
import HourBlock from "./HourBlock"
import { nanoid } from 'nanoid'

const HourForecast = (props) => {
    const { hourData, activeDayTab, tempUnit } = props
    const activeDayData = hourData.filter((element) => element.weekDay === activeDayTab)[0]

    let lastExpanded = useRef()

    const expandHourBlock = (event) => {
        const element = event.currentTarget.nextSibling
        if (lastExpanded.current === null || lastExpanded.current === undefined) {
            lastExpanded.current = element
            lastExpanded.current.classList.toggle('collapsed')
        }
        else if (lastExpanded.current === element) {
            lastExpanded.current.classList.toggle('collapsed')
            lastExpanded.current = null
        }
        else {
            lastExpanded.current.classList.toggle('collapsed')
            lastExpanded.current = element
            lastExpanded.current.classList.toggle('collapsed')
        }
    }

    useEffect(() => {
        if (lastExpanded.current) {
            lastExpanded.current.classList.toggle('collapsed')
            lastExpanded.current = null
        }
    })

    return (
        <div className="d-flex p-relative">
            <div className="hourly-forecast">
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
                                onClick={expandHourBlock}
                            />
                        )
                    })
                }
            </div>
            <ScrollButton buttonClass="scroll-button-left" imgClass="chevron-left" />
            <ScrollButton buttonClass="scroll-button-right" imgClass="chevron-right" />
        </div>
    )
}

export default HourForecast