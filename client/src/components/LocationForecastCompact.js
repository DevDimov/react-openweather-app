import HourBlockCompact from './HourBlockCompact'
import styles from './LocationForecastCompact.module.css'

const LocationForecastCompact = ({ hourData, tempUnit }) => { 

    return (
        <div className={styles.container}>
            {
                hourData[0].hourly_data.map((obj, index) => {
                        return (
                            <HourBlockCompact
                                key={obj.time_string}
                                icon={obj.icon}
                                time={obj.time_string}
                                tempUnit={tempUnit}
                                temp={obj.temp}
                            />
                        )
                })
            }
        </div>
    )
}

export default LocationForecastCompact