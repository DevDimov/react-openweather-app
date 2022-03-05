import { MutableRefObject } from "react"
// import { getLongDayName, getDateOrdinal } from '../js/utils'
import { Language, Ordinal } from "../typescript/ApiTypes"
import './DayTabSwitch.css'

type DayTabSwitchProps = {
    lang: Language
    activeDayTab: number,
    setActiveTab: (a: number) => void,
    scrollRef: MutableRefObject<HTMLDivElement>,
    dayTabDate: string
}

const DayTabSwitch = ({ lang, activeDayTab, setActiveTab, scrollRef, dayTabDate }: DayTabSwitchProps) => {

    const getNextDayName = (dateString: string) => {
        let d = new Date(dateString)
        d.setDate(d.getDate() + 1)
        const longDayName = lang.longDays[d.getDay()]
        let key = d.getDate()
        let dateOrdinal = lang.ordinal[key as keyof Ordinal]
        return longDayName + " " + key + dateOrdinal
    }

    const handleOnClick = () => {
        setActiveTab(activeDayTab + 1)
        scrollRef.current.scrollLeft = 0
    }

    return (
        <div
            className="DayTabSwitch"
            onClick={handleOnClick}>
            <p>{lang.nextDayButton}</p>
            <p className="font-weight-600">{getNextDayName(dayTabDate)}</p>
        </div>
    )
}

export default DayTabSwitch