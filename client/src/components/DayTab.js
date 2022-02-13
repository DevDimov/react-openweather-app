import globalStyles from '../css/global.module.css'
import styles from './DayTab.module.css'

const DayTab = ({ data, iconURL, setActiveTab, tabIndex, selected }) => {

    return (
        <button
            className={selected ? `${styles.button} ${styles.selected}` : styles.button}
            onClick={() => setActiveTab(tabIndex)}
        >
            <p className={globalStyles['font-weight-600']}>{data.dayName}</p>
            <div className={globalStyles['flex-center']}>
                <img
                    className={styles.icon}
                    src={iconURL}
                    alt="DayTab Icon"
                />
                <span className={globalStyles['font-weight-400']}>{`${data.maxTemp}°`}</span>
            </div>
        </button>
    )
}

export default DayTab