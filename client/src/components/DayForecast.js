import DayTab from "./DayTab"

const DayForecast = ({ dayData, activeDayTab, setActiveTab, locationName }) => {

    return (
        <div className="daily-forecast">
            {
                dayData.map((data, index) => {
                    return (
                        <DayTab
                            data={data}
                            activeDayTab={activeDayTab}
                            setActiveTab={setActiveTab}
                            iconURL={data.maxTempIcon}
                            key={index}
                            tabIndex={index}
                            locationName={locationName}
                        />
                    )
                })
            }
        </div>
    )
}

export default DayForecast