import { ApiTimestamp, ApiData, HeaderData, HourData, Forecast, DayData } from '../typescript/ApiTypes'

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

export const getHeaderData = function (apiData: ApiData): HeaderData {
    return {
        id: apiData.city.id,
        name: apiData.city.name,
        country: apiData.city.country,
        // timezone is an offset from UTC in seconds
        timezone: apiData.city.timezone,
        sunrise: apiData.city.sunrise,
        sunset: apiData.city.sunset,
        icon: '/images/' + apiData.list[0].weather[0].icon + '@2x.png',
        temp: Math.round(apiData.list[0].main.temp),
        weather: {
            main: apiData.list[0].weather[0].main,
            description: apiData.list[0].weather[0].description
        }
    }
}

const extractHourData = (item: ApiTimestamp): HourData => {
    const hourData = {
        temp: Math.round(item.main.temp),
        feelsLike: Math.round(item.main.feels_like),
        description: item.weather[0].description,
        icon: '/images/' + item.weather[0].icon + '@2x.png',
        chanceOfRain: item.pop,
        cloudiness: item.clouds.all,
        windSpeed: item.wind.speed,
        dateString: item.dt_txt,
        pod: item.sys.pod,
    }
    hourData.description = hourData.description.charAt(0).toUpperCase() + hourData.description.slice(1)
    return hourData
}

const createDayData = (dayData: HourData[]): Forecast => {
    let dateString = dayData[0].dateString
    let currentDate = new Date(dateString)
    let currentDay = currentDate.getDay()
    let dayName = getShortDayName(currentDay)
    const dayDataObj = {
        dayName: dayName,
        dayIndex: currentDay,
        dateString: dateString,
        hourly_data: dayData
    }
    return dayDataObj
}

export const getHourData = function (apiData: ApiData): Forecast[] {
    const lastIndex: number = apiData.list.length - 1
    let hourData: HourData
    let dayData: HourData[] = []
    let forecast: Forecast[] = []

    apiData.list.forEach((item, index) => {
        hourData = extractHourData(item)
        let currentHour = new Date(item.dt_txt).getHours()

        if (currentHour !== 6) {
            dayData.push(hourData)
        }

        else if (currentHour === 6) {
            if (dayData.length > 0) {
                forecast.push(createDayData(dayData))
                dayData = []
            }
            
            // Push any new 6am hour data to the now empty hour-by-hour array
            dayData.push(hourData)
        }

        // Ensure the timestamps for the last day get pushed to the final forecast array
        if (index === lastIndex && dayData.length > 0) {
            forecast.push(createDayData(dayData))
        }
    })
    return forecast
}

export const getDayData = function (forecast: Forecast[]): DayData[] {
    let dayData: DayData[] = []
    forecast.forEach((obj, index) => {
        let maxTemp = -999
        let maxTempIcon = ''
        let dayName = obj.dayName
        let dayIndex = obj.dayIndex
        let dateString = obj.dateString

        if (index === 0) { 
            const timeHour = new Date(dateString).getHours()
            if ( timeHour >= 6 && timeHour <= 18) {
                dayName = 'Today'
            }
            else {
                dayName = 'Tonight'
            }
        }

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