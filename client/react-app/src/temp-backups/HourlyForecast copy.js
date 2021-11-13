import { useState } from "react";

const HourBlock = (props) => {
    const { time, icon, temp } = props
    return (
        <div className="hourly-block">
            <p>{time}</p>
            <img className="icon" src={icon} alt="icon" />
            <p className="hourly-temp">{temp}°</p>
        </div>
    )
}

const HourlyForecast = (props) => {
    const { hourlyData } = props
    console.log(hourlyData)

    const [state, setState] = useState({
        activeDay: null
    })

    return (
        <div className="hourly-forecast">
            {
                hourlyData[1].hourly_data.map((hourBlock, index) => {
                    return <HourBlock
                        key={index}
                        time={hourBlock.time_string}
                        icon={hourBlock.icon}
                        temp={hourBlock.temp}
                    />
                })
            }
        </div>
    )
}

export default HourlyForecast