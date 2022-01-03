const DayTab = ({ dayTab, activeDayTab, style, iconURL, handleOnChange, index, locationName }) => {
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
                <span className="daytab-name font-weight-600">{dayTab.dayName}</span>
                <div className="d-flex-center">
                    <img className="daytab-icon" src={iconURL} alt="DayTab Icon" />
                    <span className="font-weight-400">{dayTab.maxTemp}°</span>
                </div>
            </label>
        </div>
    )
}

export default DayTab