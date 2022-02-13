import DayTab from "./DayTab"

const DayForecast = ({ dayData, activeDayTab, setActiveTab, locationName }) => {

    return (
        <div className="daily-forecast">
            <DayTab
                data={dayData[0]}
                selected={activeDayTab === 0 ? true : false}
                setActiveTab={setActiveTab}
                iconURL={dayData[0].maxTempIcon}
                key={dayData[0].dateString}
                // tabIndex={0}
                // locationName={locationName}
            />
            <DayTab
                data={dayData[1]}
                selected={activeDayTab === 1 ? true : false}
                setActiveTab={setActiveTab}
                iconURL={dayData[1].maxTempIcon}
                key={dayData[1].dateString}
                // tabIndex={0}
                // locationName={locationName}
            />
            {/* {
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
            } */}
        </div>
    )
}

export default DayForecast