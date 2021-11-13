import { useState } from "react";
import LocationHeader from './LocationHeader'
import LocationForecast from './LocationForecast'
// import HourlyForecast from './HourlyForecast'
// import DailyForecast from './DailyForecast'

const Location = (props) => {
    const { weatherData } = props

    // Generate data for header
    const headerData = {
        name: weatherData.city.name,
        icon: weatherData.list[0].weather[0].icon,
        temp: weatherData.list[0].main.temp,
        weather: weatherData.list[0].weather[0].description
    }
    headerData.icon = 'http://openweathermap.org/img/wn/' + headerData.icon + '@2x.png'
    headerData.temp = Math.round(headerData.temp)
    headerData.weather = headerData.weather.charAt(0).toUpperCase() + headerData.weather.slice(1)

    // Generate hourly weather data
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    let hourlyData = {}
    let dailyData = []
    let forecast = []
    let dateTracker = new Date(weatherData.list[0].dt_txt.split(' ')[0])
    let dayName = ''
    weatherData.list.forEach((item, index) => {
        let currentDate = new Date(item.dt_txt.split(' ')[0])
        if (currentDate > dateTracker) {
            dayName = weekDays[dateTracker.getDay()]
            forecast.push({
                week_day: dayName,
                hourly_data: dailyData
            })
            dateTracker = new Date(currentDate)
            dailyData = []
        }
        if (currentDate-dateTracker === 0) {
            hourlyData = {
                temp: Math.round(item.main.temp),
                feels_like: Math.round(item.main.feels_like),
                description: item.weather[0].description,
                icon: item.weather[0].icon,
                cloudiness: item.clouds.all,
                wind_speed: item.wind.speed,
                date_string: item.dt_txt.split(' ')[0],
                time_string: item.dt_txt.split(' ')[1].slice(0,5)
            }
            hourlyData.description = hourlyData.description.charAt(0).toUpperCase() + hourlyData.description.slice(1)
            hourlyData.icon = 'http://openweathermap.org/img/wn/' + hourlyData.icon + '@2x.png'
            dailyData.push(hourlyData)
        }
        if (index === weatherData.list.length && dailyData.length > 0) {
            forecast.push({[dayName]: dailyData})
        }
    })
    console.log(forecast)

    // Extract the max temperature for each day
    let dailyMax = []
    forecast.forEach((obj) => {
        let maxTemp = 0
        let dayName = obj.week_day
        obj.hourly_data.forEach((hourlyBlock) => {
            let temp = hourlyBlock.temp
            maxTemp = Math.max(temp, maxTemp)
        })
        dailyMax.push({
            day_name: dayName,
            max_temp: maxTemp
        })
    })
    console.log(dailyMax)

    const [state, setState] = useState({
        activeDay: null
    })

    return (
        <div className="location">
            <LocationHeader headerData={headerData} />
            <LocationForecast hourlyData={forecast} dailyMax={dailyMax} />
            {/* <HourlyForecast hourlyData={forecast} />
            <DailyForecast dailyMax={dailyMax} /> */}
        </div>
    )
}

export default Location