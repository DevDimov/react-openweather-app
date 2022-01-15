import { useState, useEffect } from 'react'
import Location from './components/Location'
import SearchBar from './components/SearchBar'
import StatusInfo from './components/StatusInfo'
import { getHeaderData, getHourData, getDayData, dataToFahrenheit, dataToCelcius } from './js/utils'
import lastUpdatedIcon from "./images/last-updated-icon.svg"

const App = () => {

    const [locations, setLocations] = useState([])
    const [tempUnit, setTempUnit] = useState('C')
    const [forecast, setForecast] = useState([])
    const [searchError, setSearchError] = useState('')
    const [lastUpdated, setLastUpdated] = useState('')

    useEffect(() => {
        const locationList = JSON.parse(localStorage.getItem('weather-app-location-list'))
        if (locationList) {
            loadLocations(locationList);
        }
    }, [])

    useEffect(() => {
        if (forecast.length > 0 && tempUnit === 'F') {
            const newForecast = dataToFahrenheit(forecast)
            setForecast(newForecast)
        }
        else if (forecast.length > 0 && tempUnit === 'C') {
            const newForecast = dataToCelcius(forecast)
            setForecast(newForecast)
        }
    }, [tempUnit])

    useEffect(() => {
        if (locations.length === 0) {
            setLastUpdated('')
        }
        else {
            setLastUpdated(`Last updated at ${getCurrentTime()}`)
        }
    }, [locations])

    const loadLocations = async (locationList) => {
        if (locationList.length > 0) {
            let newForecast = []
            let data = {}
            try {
                for (const location of locationList) {
                    data = await getWeather(location)
                    newForecast.push(data)
                }
                setForecast(newForecast)
                setLocations(locationList)
            }
            catch {
                setSearchError(`${data.message}. Error: ${data.cod}`)
            }
        }
    }

    const getTempUnits = () => {
        if (tempUnit === 'C') {
            return 'metric'
        }
        return 'imperial'
    }

    const getWeather = async (location) => {
        const units = getTempUnits()
        // const response = await fetch('testDataNewYork.json') // For dev only
        const response = await fetch(`/api?q=${location}&units=${units}`)
        if (response.status >= 200 && response.status <= 299) {
            const data = await response.json()
            if (data.cnt > 0) {
                const headerData = getHeaderData(data)
                const hourData = getHourData(data)
                const dayData = getDayData(hourData)
                const newForecast = {
                    locationName: location,
                    tempUnit: tempUnit,
                    headerData: headerData,
                    hourData: hourData,
                    dayData: dayData
                }
                // console.log('newForecast', newForecast)
                return newForecast
            }
            else {
                // console.log(data)
                return {
                    status: data.cod,
                    statusText: data.message
                }
            }
        } else {
            // console.log(response.status, response.statusText)
            return {
                status: 500,
                statusText: 'Internal server error'
            }
        }

    }

    const updateForecast = (location, newForecast) => {
        addLocation(location)
        setForecast([newForecast, ...forecast])
    }

    const saveToLocalStorage = (items) => {
        localStorage.setItem('weather-app-location-list', JSON.stringify(items));
    }

    const addLocation = (location) => {
        const newLocations = [location, ...locations]
        setLocations(newLocations)
        saveToLocalStorage(newLocations)
    }

    const removeLocation = (name) => {
        const newLocations = locations.filter((location) => (location !== name))
        const newForecast = forecast.filter((forecast) => (forecast.locationName !== name))
        setLocations(newLocations)
        setForecast(newForecast)
        saveToLocalStorage(newLocations)
    }

    const getCurrentTime = () => {
        const date = new Date().toISOString()
        return date.split('T')[1].slice(0, 5)
    }

    return (
        <div className="d-flex-center fd-column">
            <SearchBar
                locations={locations}
                getWeather={getWeather}
                searchError={searchError}
                updateForecast={updateForecast}
                suggestions={[
                    "Abu Dhabi, United Arab Emirates",
                    "Abuja, Nigeria",
                    "Accra, Ghana",
                    "Addis Ababa, Ethiopia",
                    "Algiers, Algeria",
                    "Amman, Jordan",
                    "Amsterdam, Netherlands",
                    "Andorra la Vella, Andorra",
                    "Ankara, Turkey",
                    "Antananarivo, Madagascar",
                    "Apia, Samoa",
                    "Ashgabat, Turkmenistan",
                    "Asmara, Eritrea",
                    "Asunción, Paraguay",
                    "Athens, Greece",
                    "Baghdad, Iraq",
                    "Baku, Azerbaijan",
                    "Bamako, Mali",
                    "Bandar Seri Begawan, Brunei",
                    "Bangkok, Thailand",
                    "Bangui, Central African Republic",
                    "Banjul, The Gambia",
                    "Basseterre, Saint Kitts & Nevis",
                    "Beijing, China",
                    "Beirut, Lebanon",
                    "Belgrade, Serbia",
                    "Belmopan, Belize",
                    "Berlin, Germany",
                    "Bern, Switzerland",
                    "Bishkek, Kyrgyzstan",
                    "Bissau, Guinea-Bissau",
                    "Bloemfontein, South Africa",
                    "Bogotá, Colombia",
                    "Brasilia, Brazil",
                    "Bratislava, Slovakia",
                    "Brazzaville, Republic of the Congo ",
                    "Bridgetown, Barbados",
                    "Brussels, Belgium",
                    "Bucharest, Romania",
                    "Budapest, Hungary",
                    "Buenos Aires, Argentina",
                    "Cairo, Egypt",
                    "Canberra, Australia",
                    "Cape Town, South Africa",
                    "Caracas, Venezuela",
                    "Castries, Saint Lucia",
                    "Chisinau, Moldova",
                    "Conakry, Guinea",
                    "Copenhagen, Denmark",
                    "Dakar, Senegal",
                    "Damascus, Syria",
                    "Dhaka, Bangladesh",
                    "Dili, Timor-Leste",
                    "Djibouti City, Djibouti",
                    "Dodoma, Tanzania",
                    "Doha, Qatar",
                    "Dublin, Ireland",
                    "Dushanbe, Tajikistan",
                    "East Jerusalem, Palestine",
                    "Freetown, Sierra Leone",
                    "Funafuti, Tuvalu",
                    "Gaborone, Botswana",
                    "Georgetown, Guyana",
                    "Gitega, Burundi",
                    "Guatemala City, Guatemala",
                    "Hanoi, Vietnam",
                    "Harare, Zimbabwe",
                    "Havana, Cuba",
                    "Helsinki, Finland",
                    "Honiara, Solomon Islands",
                    "Islamabad, Pakistan",
                    "Jakarta, Indonesia",
                    "Jerusalem, Israel",
                    "Juba, South Sudan",
                    "Kabul, Afghanistan",
                    "Kampala, Uganda",
                    "Kathmandu, Nepal",
                    "Khartoum, Sudan",
                    "Kiev, Ukraine",
                    "Kigali, Rwanda",
                    "Kingston, Jamaica",
                    "Kingstown, Saint Vincent & The Grenadines",
                    "Kinshasa, Democratic Republic of the Congo",
                    "Kuala Lumpur, Malaysia",
                    "Kuwait City, Kuwait",
                    "Libreville, Gabon",
                    "Lilongwe, Malawi",
                    "Lima, Peru",
                    "Lisbon, Portugal",
                    "Ljubljana, Slovenia",
                    "Lomé, Togo",
                    "London, United Kingdom",
                    "Luanda, Angola",
                    "Lusaka, Zambia",
                    "Luxembourg, Luxembourg",
                    "Madrid, Spain",
                    "Majuro, Marshall Islands",
                    "Malabo, Equatorial Guinea",
                    "Male, Maldives",
                    "Managua, Nicaragua",
                    "Manama, Bahrain",
                    "Manila, Philippines",
                    "Maputo, Mozambique",
                    "Maseru, Lesotho",
                    "Mbabane, Eswatini",
                    "Mexico City, Mexico",
                    "Minsk, Belarus",
                    "Mogadishu, Somalia",
                    "Monaco, Monaco",
                    "Monrovia, Liberia",
                    "Montevideo, Uruguay",
                    "Moroni, Comoros",
                    "Moscow, Russia",
                    "Muscat, Oman",
                    "Nairobi, Kenya",
                    "Nassau, The Bahamas",
                    "Nay Pyi Taw, Myanmar",
                    "N'Djamena, Chad",
                    "New Delhi, India",
                    "Ngerulmud, Palau",
                    "Niamey, Niger",
                    "Nicosia, Cyprus",
                    "Nouakchott, Mauritania",
                    "Nuku'alofa, Tonga",
                    "Nur-Sultan, Kazakhstan",
                    "Oslo, Norway",
                    "Ottawa, Canada",
                    "Ouagadougou, Burkina Faso",
                    "Palikir, Micronesia",
                    "Panama City, Panama",
                    "Paramaribo, Suriname",
                    "Paris, France",
                    "Phnom Penh, Cambodia",
                    "Podgorica, Montenegro",
                    "Port Louis, Mauritius",
                    "Port Moresby, Papua New Guinea",
                    "Port of Spain, Trinidad & Tobago",
                    "Port Vila, Vanuatu",
                    "Port-au-Prince, Haiti",
                    "Porto-Novo, Benin",
                    "Prague, Czechia",
                    "Praia, Cabo Verde",
                    "Pretoria, South Africa",
                    "Pristina, Kosovo",
                    "Pyongyang, North Korea",
                    "Quito, Ecuador",
                    "Rabat, Morocco",
                    "Reykjavik, Iceland",
                    "Riga, Latvia",
                    "Riyadh, Saudi Arabia",
                    "Rome, Italy",
                    "Roseau, Dominica",
                    "Saint George's, Grenada",
                    "Saint John's, Antigua & Barbuda",
                    "San Jose, Costa Rica",
                    "San Marino, San Marino",
                    "San Salvador, El Salvador",
                    "Sana'a, Yemen",
                    "Santiago, Chile",
                    "Santo Domingo, Dominican Republic",
                    "São Tomé, São Tomé & Príncipe",
                    "Sarajevo, Bosnia & Herzegovina",
                    "Seoul, South Korea",
                    "Singapore, Singapore",
                    "Skopje, North Macedonia",
                    "Sofia, Bulgaria",
                    "South Tarawa, Kiribati",
                    "Sri Jayawardenepura Kotte, Sri Lanka",
                    "Stockholm, Sweden",
                    "Sucre, Bolivia",
                    "Suva, Fiji",
                    "Tallinn, Estonia",
                    "Tashkent, Uzbekistan",
                    "Tbilisi, Georgia",
                    "Tegucigalpa, Honduras",
                    "Tehran, Iran",
                    "Thimphu, Bhutan",
                    "Tirana, Albania",
                    "Tokyo, Japan",
                    "Tripoli, Libya",
                    "Tunis, Tunisia",
                    "Ulaanbaatar, Mongolia",
                    "Vaduz, Liechtenstein",
                    "Valletta, Malta",
                    "Vatican City, Vatican City",
                    "Victoria, Seychelles",
                    "Vienna, Austria",
                    "Vientiane, Laos",
                    "Vilnius, Lithuania",
                    "Warsaw, Poland",
                    "Washington, DC, United States of America",
                    "Wellington, New Zealand",
                    "Windhoek, Namibia",
                    "Yamoussoukro, Côte d'Ivoire",
                    "Yaounde, Cameroon",
                    "Yaren District, Nauru",
                    "Yerevan, Armenia",
                    "Zagreb, Croatia"
                ]}
            />
            {
                forecast.length > 0 &&
                <div className="container d-flex-center fd-column">
                    {
                        forecast.map((obj) => {
                            return (
                                <Location
                                    key={obj.headerData.id}
                                    location={obj.locationName}
                                    data={obj}
                                    tempUnit={tempUnit}
                                    setTempUnit={setTempUnit}
                                    removeLocation={removeLocation}
                                />
                            )
                        })
                    }
                </div>
            }
            {
                lastUpdated &&
                <StatusInfo
                    text={lastUpdated}
                    icon={lastUpdatedIcon}
                />
            }
        </div>
    )
}

export default App