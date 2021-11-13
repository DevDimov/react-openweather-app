export const toFahrenheit = function (tempC) {
    return Math.round((tempC * 9 / 5) + 32)
}

export const toCelcius = function (tempF) {
    return Math.round((tempF - 32) * 5 / 9)
}

export const getHeaderData = function (weatherData) {
    return {
        name: weatherData.city.name,
        icon: '/images/' + weatherData.list[0].weather[0].icon + '@2x.png',
        temp: Math.round(weatherData.list[0].main.temp),
        weather: weatherData.list[0].weather[0].main
    }
}

export const getHourData = function (weatherData) {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    let dayName = ''
    let hourData = {}
    let dailyData = []
    let forecast = []
    weatherData.list.forEach((item, index) => {
        hourData = {
            temp: Math.round(item.main.temp),
            feels_like: Math.round(item.main.feels_like),
            description: item.weather[0].description,
            icon: '/images/' + item.weather[0].icon + '@2x.png',
            cloudiness: item.clouds.all,
            wind_speed: item.wind.speed,
            date_string: item.dt_txt.split(' ')[0],
            time_string: item.dt_txt.split(' ')[1].slice(0, 5)
        }
        hourData.description = hourData.description.charAt(0).toUpperCase() + hourData.description.slice(1)
        let currentHour = item.dt_txt.split(' ')
        if (currentHour[1] !== '06:00:00') {
            dailyData.push(hourData)
        }
        else if (currentHour[1] === '06:00:00') {
            let currentDate = new Date(currentHour[0])
            let currentDay = currentDate.getDay()
            if (currentDay - 1 < 0) {
                dayName = dayNames[dayNames.length - 1]
            }
            else {
                dayName = dayNames[currentDay - 1]
            }
            if (dailyData.length > 0) {
                forecast.push({
                    weekDay: dayName,
                    hourly_data: dailyData
                })
                dailyData = []
            }
            dailyData.push(hourData)
        }
    })
    return forecast
}

export const getDayData = function (forecast) {
    let dayData = []
    forecast.forEach((obj) => {
        let maxTemp = 0
        let maxTempIcon = ''
        let dayName = obj.weekDay
        obj.hourly_data.forEach((hourlyBlock) => {
            let temp = hourlyBlock.temp
            if (temp > maxTemp) {
                maxTemp = temp
                maxTempIcon = hourlyBlock.icon
            }
        })
        dayData.push({
            dayName: dayName,
            maxTemp: maxTemp,
            maxTempIcon: maxTempIcon
        })
    })
    return dayData
}

export const fetchApiData = async () => {
    // const WS_URL = 'http://localhost:3000/api/search?q='
    // const WS_URL = 'https://weatherstack-app.herokuapp.com/api/search?q='

    const url = 'data.json'
    const response = await fetch(url)
    const data = await response.json()
    // console.log(data)
    return data
}

export const dataToFahrenheit = (array) => {
    const newData = array.map((obj) => {
        obj.headerData.temp = toFahrenheit(obj.headerData.temp)
        obj.hourData.forEach((day) => {
            day.hourly_data.forEach((hour) => {
                hour.temp = toFahrenheit(hour.temp)
                hour.feels_like = toFahrenheit(hour.feels_like)
            })
        })
        obj.dayData.forEach((day) => {
            day.maxTemp = toFahrenheit(day.maxTemp)
        })
        return obj
    })
    return newData
}

export const dataToCelcius = (array) => {
    const newData = array.map((obj) => {
        obj.headerData.temp = toCelcius(obj.headerData.temp)
        obj.hourData.forEach((day) => {
            day.hourly_data.forEach((hour) => {
                hour.temp = toCelcius(hour.temp)
                hour.feels_like = toCelcius(hour.feels_like)
            })
        })
        obj.dayData.forEach((day) => {
            day.maxTemp = toCelcius(day.maxTemp)
        })
        return obj
    })
    return newData
}

const toMilesPerHour = function () {
    let speed = window.event.target;
    let len = speed.innerHTML.length
    let speedKMH = Number(speed.innerHTML.substring(0, len - 4))
    let speedMPH = (speedKMH / 1.609).toFixed(0)
    speed.innerHTML = speedMPH + ' mph'
    speed.onclick = toKilometersPerHour
}

const toKilometersPerHour = function () {
    let speed = window.event.target;
    let len = speed.innerHTML.length
    let speedMPH = Number(speed.innerHTML.substring(0, len - 4))
    let speedKMH = (speedMPH * 1.609).toFixed(0)
    speed.innerHTML = speedKMH + ' kmh'
    speed.onclick = toMilesPerHour
}