import { useState } from "react";

const DailyForecast = (props) => {
    const { dailyMax } = props

    const [state, setState] = useState({
        activeOption: dailyMax[0].day_name
    })

    const handleOnChange = (event) => {
        setState({
            activeOption: event.target.value
        })
    }

    return (
        <div className="daily-forecast">
            {
                dailyMax.map((dayTab, index) => {
                    return (
                        <div className="day-block">
                            <input
                                type="radio"
                                id={"tab" + index}
                                name="dayTabs"
                                checked={state.activeOption === dayTab.day_name}
                                value={dayTab.day_name}
                                onChange={handleOnChange}
                            />
                            <label htmlFor={"tab" + index} className="label-radio" >
                                <p className="week-day">{dayTab.day_name}</p>
                                <p>{dayTab.max_temp}°</p>
                            </label>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default DailyForecast