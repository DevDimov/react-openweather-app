import styles from './DayTabs.module.css'
import DayTab from "./DayTab"

const DayTabs = ({ lang, dayData, activeDayTab, setActiveTab, tempUnit }) => {

    return (
        <div className={styles.container}>
            {
                dayData.map((data, index) => {
                    return (
                        <DayTab
                            lang={lang}
                            data={data}
                            selected={activeDayTab === index ? true : false}
                            setActiveTab={setActiveTab}
                            iconURL={data.maxTempIcon}
                            key={data.dateString}
                            tabIndex={index}
                            tempUnit={tempUnit}
                        />
                    )
                })
            }
        </div>
    )
}

export default DayTabs