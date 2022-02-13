import styles from './DayTab.module.css'

const DayTab = ({ data, iconURL, setActiveTab, tabIndex, locationName, selected }) => {
    
    // const id = 'tab' + tabIndex + '_' + locationName

    return (
        <div className={styles.container}>
            <input
                type="radio"
                // id={id}
                checked={selected}
                value={data.dayName}
                onChange={() => setActiveTab(tabIndex)}
            />
            <label
                // htmlFor={id}
                className="label-radio">
                <span className="daytab-name font-weight-600">{data.dayName}</span>
                <div className="d-flex-center">
                    <img className="daytab-icon" src={iconURL} alt="DayTab Icon" />
                    <span className="font-weight-400">{data.maxTemp}°</span>
                </div>
            </label>
        </div>
    )
}

export default DayTab