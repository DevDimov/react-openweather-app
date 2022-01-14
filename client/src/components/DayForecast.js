import DayTab from "./DayTab"

const DayForecast = ({ dayData, activeDayTab, setActiveTab, locationName }) => {

    return (
        <div className="daily-forecast">
            {
                dayData.map((data, index) => {
                    return (
                        <DayTab
                            data={data}
                            selected={activeDayTab === index ? true : false}
                            setActiveTab={setActiveTab}
                            iconURL={data.maxTempIcon}
                            key={data.dateString}
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