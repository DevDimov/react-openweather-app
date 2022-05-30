import HourBlockCompact from './HourBlockCompact'
import styles from './LocationForecastCompact.module.css'

const LocationForecastCompact = ({ hourData, tempUnit }) => { 

    return (
        <div className={styles.container}>
            {
                hourData[0].hourly_data.map((obj, index) => {
                        return (
                            <HourBlockCompact
                                key={obj.dateString.split(' ')[1].slice(0, 5)}
                                icon={obj.icon}
                                time={obj.dateString.split(' ')[1].slice(0, 5)}
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