const DayTab = ({ dayTab, activeDayTab, style, handleOnChange, index, locationName }) => {
    // const uniqueStr = nanoid(2)
    const id = 'tab' + index + '_' + locationName

    return (
        <div className="day-block">
            <input
                type="radio"
                id={id}
                checked={activeDayTab === dayTab.dayName}
                value={dayTab.dayName}
                onChange={handleOnChange}
            />
            <label
                htmlFor={id}
                className="label-radio">
                <p className="week-day">{dayTab.dayName}</p>
                <p>{dayTab.maxTemp}°</p>
            </label>
            <label
                htmlFor={id}
                className="daytab-image"
                style={style}>
            </label>
        </div>
    )
}

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