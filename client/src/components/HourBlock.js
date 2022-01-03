import { useState} from "react"
import HourDetails from "./HourDetails"

const HourBlock = (props) => {
    const { time, icon, temp, hourDetails, onClick, tempUnit } = props
    
    const [collapsed, setCollapsed] = useState(true)
    
    return (
        <div className="hourly-block-container">
            <div className="hourly-block" onClick={() => setCollapsed(!collapsed)}>
                <p>{time}</p>
                <img className="icon" src={icon} alt="icon" />
                <p className="hourly-temp">{temp}°</p>
            </div>
            <HourDetails
                hourDetails={hourDetails}
                tempUnit={tempUnit}
                collapsed={collapsed}
            />
        </div>
    )
}

export default HourBlock