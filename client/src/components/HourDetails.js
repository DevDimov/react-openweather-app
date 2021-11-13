const HourDetails = (props) => {
    const { hourDetails, tempUnit } = props

    return (
        <div className="hour-details collapsed">
            <p className="font-weight-600">{hourDetails.description}</p>
            <p>Feels like <span>{hourDetails.feels_like}°{tempUnit}</span></p>
            <p>Cloudiness <span>{hourDetails.cloudiness}%</span></p>
            <p>Wind speed <span>{hourDetails.wind_speed} m/s</span></p>
        </div>
    )
}

export default HourDetails