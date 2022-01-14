import { MutableRefObject } from "react"
import { getLongDayName, getDateOrdinal } from '../js/utils'

type DayTabSwitchProps = {
    activeDayTab: number,
    setActiveTab: (a: number) => void,
    scrollRef: MutableRefObject<HTMLDivElement>,
    dayTabDate: string
}

const DayTabSwitch = ({ activeDayTab, setActiveTab, scrollRef, dayTabDate }: DayTabSwitchProps) => {

    const getNextDayName = (dateString: string) => {
        let d = new Date(dateString)
        d.setDate(d.getDate() + 1)
        const longDayName = getLongDayName(d.getDay())
        const dateOrdinal = getDateOrdinal(d.getDate())
        return longDayName + " " + dateOrdinal
    }
    
    const handleOnClick = () => {
        setActiveTab(activeDayTab + 1)
        scrollRef.current.scrollLeft = 0
    }

    return (
        <div className="daytab-switch" onClick={handleOnClick}>
            <p>See the weather for</p>
            <p className="font-weight-600">{getNextDayName(dayTabDate)}</p>
        </div>
    )
}

export default DayTabSwitch