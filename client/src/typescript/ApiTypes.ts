type ApiTimestamp = {
    dt: number,
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        sea_level: number,
        grnd_level: number,
        humidity: number,
        temp_kf: number
    },
    weather: [
        {
            id: number,
            main: string,
            description: string,
            icon: string
        }
    ],
    clouds: {
        all: number
    },
    wind: {
        speed: number,
        deg: number,
        gust: number
    },
    visibility: number,
    pop: number,
    rain: {
        h: number
    },
    sys: {
        pod: string
    },
    dt_txt: string
}

export type ApiData = {
    cod: string,
    message: number,
    cnt: number,
    list: ApiTimestamp[],
    city: {
        id: number,
        name: string,
        coord: { lat: number, lon: number },
        country: string,
        population: number,
        timezone: number,
        sunrise: number,
        sunset: number
    }
}

export type HeaderData = {
    id: number,
    name: string,
    country: string,
    timezone: number,
    sunrise: number,
    sunset: number,
    icon: string,
    temp: number,
    weather: string
}

export type HourData = {
    temp: number,
    feels_like: number,
    description: string,
    icon: string,
    cloudiness: number,
    wind_speed: number,
    date_string: string,
    time_string: string
}

export type Forecast = {
    weekDay: string,
    dateString: string,
    hourly_data: HourData[]
}

export type DayData = {
    dayName: string,
    dateString: string,
    maxTemp: number,
    maxTempIcon: string
}

export type WeatherData = {
    locationName: string,
    tempUnit: string,
    headerData: HeaderData,
    hourData: Forecast[],
    dayData: DayData[]
}