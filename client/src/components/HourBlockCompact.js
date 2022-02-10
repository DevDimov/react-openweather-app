import styles from './HourBlockCompact.module.css'
import { toCelcius, toFahrenheit } from '../js/utils'

const HourBlockCompact = ({ icon, time, tempUnit, temp }) => {

    return (
        <div className={styles.block}>
            <img
                className={styles.icon}
                src={icon}
                alt="icon" />
            <div>
                <p className={styles.time}>{time}</p>
                <p className={styles.temp}>{tempUnit === 'C' ? temp : toFahrenheit(temp)}°</p>

            </div>
        </div>
    )
}

export default HourBlockCompact