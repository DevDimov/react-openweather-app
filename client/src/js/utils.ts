import { ApiData, HeaderData, HourData, Forecast, DayData, WeatherData } from '../typescript/ApiTypes'

export const toFahrenheit = function (tempC: number): number {
    return Math.round((tempC * 9 / 5) + 32)
}

export const toCelcius = function (tempF: number): number {
    return Math.round((tempF - 32) * 5 / 9)
}

export const getHeaderData = function (weatherData: ApiData): HeaderData {
    return {
        id: weatherData.city.id,
        name: weatherData.city.name,
        country: weatherData.city.country,
        // timezone is an offset in seconds, hence divide by 3600
        timezone: weatherData.city.timezone / 3600,
        // add the timezone offset in seconds to get the local sunrise and sunset
        // from the location's timezone not the user's
        sunrise: weatherData.city.sunrise + weatherData.city.timezone,
        sunset: weatherData.city.sunset + weatherData.city.timezone,
        icon: '/images/' + weatherData.list[0].weather[0].icon + '@2x.png',
        temp: Math.round(weatherData.list[0].main.temp),
        weather: weatherData.list[0].weather[0].main
    }
}

export const getHourData = function (weatherData: ApiData): Forecast[] {
    const lastIndex: number = weatherData.list.length - 1
    let hourData: HourData
    let dailyData: HourData[] = []
    let forecast: Forecast[] = []

    // Iterate over each timestamp
    weatherData.list.forEach((item, index) => {

        // Extract the hour data from each item into an hour-by-hour object
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

        // Check the timestamp and decide whether to push the hour object to a day-by-day array
        let currentHour = item.dt_txt.split(' ')
        if (currentHour[1] !== '06:00:00') {
            dailyData.push(hourData)
        }
        else if (currentHour[1] === '06:00:00') {
            if (dailyData.length > 0) {
                let dateString = dailyData[0].date_string
                let currentDate = new Date(dateString)
                forecast.push({
                    weekDay: getShortDayName(currentDate.getDay()),
                    dateString: dateString,
                    hourly_data: dailyData
                })
                dailyData = []
            }
            // Push any new 6am hour data to the now empty hour-by-hour array
            dailyData.push(hourData)
        }
        // Ensure the timestamps for the last day get pushed to the final forecast array
        if (index === lastIndex && dailyData.length > 0) {
            let dateString = dailyData[0].date_string
            let currentDate = new Date(dateString)
            forecast.push({
                weekDay: getShortDayName(currentDate.getDay()),
                dateString: dateString,
                hourly_data: dailyData
            })
        }
    })
    return forecast
}

export const getDayData = function (forecast: Forecast[]): DayData[] {
    let dayData: DayData[] = []
    forecast.forEach((obj) => {
        let maxTemp: number = -999
        let maxTempIcon: string = ''
        let dayName: string = obj.weekDay
        let dateString: string = obj.dateString
        obj.hourly_data.forEach((hourlyBlock) => {
            let temp = hourlyBlock.temp
            if (temp > maxTemp) {
                maxTemp = temp
                maxTempIcon = hourlyBlock.icon
            }
        })
        dayData.push({
            dayName: dayName,
            dateString: dateString,
            maxTemp: maxTemp,
            maxTempIcon: maxTempIcon
        })
    })
    return dayData
}

type ProcessedData = {
    headerData: HeaderData,
    hourData: Forecast[],
    dayData: DayData[]
}

export const processData = (weatherData: ApiData): ProcessedData => {
    const headerData = getHeaderData(weatherData)
    const hourData = getHourData(weatherData)
    const dayData = getDayData(hourData)
    const processedData = {
        headerData,
        hourData,
        dayData
    }
    return processedData
}

export const dataToFahrenheit = (array: WeatherData[]): WeatherData[] => {
    const newData = array.map((obj: WeatherData) => {
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

export const dataToCelcius = (array: WeatherData[]): WeatherData[] => {
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

// const toMilesPerHour = function () {
//     let speed = window.event.target;
//     let len = speed.innerHTML.length
//     let speedKMH = Number(speed.innerHTML.substring(0, len - 4))
//     let speedMPH = (speedKMH / 1.609).toFixed(0)
//     speed.innerHTML = speedMPH + ' mph'
//     speed.onclick = toKilometersPerHour
// }

// const toKilometersPerHour = function () {
//     let speed = window.event.target;
//     let len = speed.innerHTML.length
//     let speedMPH = Number(speed.innerHTML.substring(0, len - 4))
//     let speedKMH = (speedMPH * 1.609).toFixed(0)
//     speed.innerHTML = speedKMH + ' kmh'
//     speed.onclick = toMilesPerHour
// }

export const getShortDayName = (num: number): string => {
    const shortDayNames: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    if (num < -1 || num > 7) {
        return 'Error'
    }
    if (num === -1) {
        return 'Sat'
    }
    return shortDayNames[num]
}

export const getLongDayName = (num: number): string => {
    const longDayNames: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    if (num < -1 || num > 7) {
        return 'Error'
    }
    if (num === -1) {
        return 'Sat'
    }
    return longDayNames[num]
}

export const getDateOrdinal = (num: number): string => {
    let ordinal: string = ''
    if (num === 1) {
        ordinal = 'st'
    }
    if (num === 2) {
        ordinal = 'nd'
    }
    if (num === 3) {
        ordinal = 'rd'
    }
    if (num > 3) {
        ordinal = 'th'
    }
    return num + ordinal
}