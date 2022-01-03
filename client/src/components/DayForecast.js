import DayTab from "./DayTab"

const DayForecast = (props) => {
    const { dailyMax, activeDayTab, setActiveTab, locationName } = props

    const handleOnChange = (event) => {
        setActiveTab(event.target.value)
    }

    return (
        <div className="daily-forecast">
            {
                dailyMax.map((dayTab, index) => {
                    const style = {
                        backgroundImage: `url(${dayTab.maxTempIcon})`
                    }
                    return (
                        <DayTab
                            dayTab={dayTab}
                            activeDayTab={activeDayTab}
                            handleOnChange={handleOnChange}
                            style={style}
                            iconURL={dayTab.maxTempIcon}
                            key={index}
                            index={index}
                            locationName={locationName}
                        />
                    )
                })
            }
        </div>
    )
}

export default DayForecast