import HourDetails from "./HourDetails"

const HourBlock = (props) => {
    const { time, icon, temp, hourDetails, onClick, tempUnit } = props

    return (
        <div className="hourly-block-container">
            <div className="hourly-block" onClick={onClick}>
                <p>{time}</p>
                <img className="icon" src={icon} alt="icon" />
                <p className="hourly-temp">{temp}°</p>
            </div>
            <HourDetails
                hourDetails={hourDetails}
                tempUnit={tempUnit}
            />
        </div>
    )
}

export default HourBlock