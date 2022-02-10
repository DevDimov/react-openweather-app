import styles from './HeaderDetails.module.css'
import globalStyles from '../css/global.module.css'
import sunriseIcon from '../images/sunrise-icon.svg'
import sunsetIcon from '../images/sunset-icon.svg'


const HeaderDetails = ({ sunrise, sunset }) => {

    const getTime = (unix) => {
        let date = new Date(unix * 1000)
        return date.toTimeString().slice(0, 5)
    }

    return (
        <div className={styles.container}>
            <div>
                <img
                    className={styles.icon}
                    src={sunriseIcon}
                    alt="" />
                <span className={globalStyles['font-weight-600']}>Sunrise</span>
                <span>{getTime(sunrise)}</span>
            </div>
            <div>
                <img
                    className={styles.icon}
                    src={sunsetIcon}
                    alt="" />
                    <span className={globalStyles['font-weight-600']}>Sunset</span>
                    <span>{getTime(sunset)}</span>
            </div>
        </div>
    )
}

export default HeaderDetails