import { ApiData, HeaderData, HourData, Forecast, DayData, WeatherData } from '../typescript/ApiTypes'

export const toFahrenheit = function (tempC: number): number {
    return Math.round((tempC * 9 / 5) + 32)
}

export const toCelcius = function (tempF: number): number {
    return Math.round((tempF - 32) * 5 / 9)
}

export const fromMStoKMH = function (speed: number): number {
    return Math.round(speed * 3.6)
}

export const fromMStoMPH = function (speed: number): number {
    return Math.round(speed * 2.23)
}

export const getHeaderData = function (weatherData: ApiData): HeaderData {
    return {
        id: weatherData.city.id,
        name: weatherData.city.name,
        country: weatherData.city.country,
        // timezone is an offset from UTC in seconds
        timezone: weatherData.city.timezone,
        sunrise: weatherData.city.sunrise,
        sunset: weatherData.city.sunset,
        icon: '/images/' + weatherData.list[0].weather[0].icon + '@2x.png',
        temp: Math.round(weatherData.list[0].main.temp),
        weather: {
            main: weatherData.list[0].weather[0].main,
            description: weatherData.list[0].weather[0].description
        }
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
            feelsLike: Math.round(item.main.feels_like),
            description: item.weather[0].description,
            icon: '/images/' + item.weather[0].icon + '@2x.png',
            chanceOfRain: item.pop,
            cloudiness: item.clouds.all,
            windSpeed: item.wind.speed,
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
                    dayName: getShortDayName(currentDate.getDay()),
                    dayIndex: currentDate.getDay(),
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
                dayName: getShortDayName(currentDate.getDay()),
                dayIndex: currentDate.getDay(),
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
        let dayName: string = obj.dayName
        let dayIndex: number = obj.dayIndex
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
            dayIndex: dayIndex,
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

export const getCurrentTime = () => {
    return new Date().toTimeString().slice(0, 5)
}

export const getLocationTime = (unix: number, UTCshift: number) => {
    return new Date(unix * 1000 + UTCshift * 1000).toUTCString().split(' ')[4].slice(0, 5)
}