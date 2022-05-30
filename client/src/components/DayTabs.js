import DayTab from "./DayTab"
import './DayTabs.css'

const DayTabs = ({ lang, dayData, activeDayTab, setActiveTab, tempUnit }) => {

    return (
        <div className="DayTabs-wrapper">
            {
                dayData.map((data, index) => {
                    return (
                        <DayTab
                            dayTabName={index === 0 ? lang.dayPart[data.dayName] : lang.shortDays[data.dayIndex]}
                            data={data}
                            selected={activeDayTab === index ? true : false}
                            setActiveTab={setActiveTab}
                            iconURL={data.maxTempIcon}
                            key={data.dateString}
                            tabIndex={index}
                            tempUnit={tempUnit}
                        />
                    )
                })
            }
        </div>
    )
}

export default DayTabs