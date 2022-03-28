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
    weather: {
        main: string,
        description: string
    }
}

export type HourData = {
    temp: number,
    feelsLike: number,
    description: string,
    icon: string,
    chanceOfRain: number,
    cloudiness: number,
    windSpeed: number,
    date_string: string,
    time_string: string
}

export type Forecast = {
    dayName: string,
    dayIndex: number,
    dateString: string,
    hourly_data: HourData[]
}

export type DayData = {
    dayName: string,
    dayIndex: number,
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

export type Language = {
    celsius: string,
    chanceOfRain: string,
    cloudiness: string,
    compact: string,
    currently: string,
    detailed: string,
    fahrenheit: string,
    feelsLike: string,
    hourDataEnd: string,
    kmh: string,
    lang: {
        bg: string,
        de: string,
        en: string
    },
    language: string,
    lastUpdated: string,
    longDays: string[],
    mixed: string,
    mph: string,
    ms: string,
    nextDayButton: string,
    ordinal: Ordinal,
    search: {
        duplicate: string,
        invalidInput: string,
        limit: string,
        load: string,
        placeholder: string
    },
    serverError: string,
    settings: string,
    shortDays: string[],
    sunrise: string,
    sunset: string,
    temperature: string,
    update: string,
    view: string,
    windSpeed: string
}

export type Ordinal = {
    1: string,
    2: string,
    3: string,
    4: string,
    5: string,
    6: string,
    7: string,
    8: string,
    9: string,
    10: string,
    11: string,
    12: string,
    13: string,
    14: string,
    15: string,
    16: string,
    17: string,
    18: string,
    19: string,
    20: string,
    21: string,
    22: string,
    23: string,
    24: string,
    25: string,
    26: string,
    27: string,
    28: string,
    29: string,
    30: string,
    31: string,
}