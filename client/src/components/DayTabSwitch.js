const DayTabSwitch = ({ nextDayName, activeDayTab, setActiveTab, resetScroll }) => {

    const handleOnClick = () => {
        setActiveTab(activeDayTab + 1)
        resetScroll()
    }

    return (
        <div className="daytab-switch" onClick={handleOnClick}>
            <p>See the weather for</p>
            <p className="font-weight-600">{nextDayName}</p>
        </div>
    )
}

export default DayTabSwitch