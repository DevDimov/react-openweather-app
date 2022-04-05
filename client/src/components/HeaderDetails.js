import './HeaderDetails.css'
import sunriseIcon from '../images/sunrise-icon.svg'
import sunsetIcon from '../images/sunset-icon.svg'


const HeaderDetails = ({ lang, sunrise, sunset }) => {

    const getTime = (unix) => {
        let date = new Date(unix * 1000)
        return date.toTimeString().slice(0, 5)
    }

    return (
        <div className='HeaderDetails'>
            <div>
                <img
                    className='HeaderDetails-icon'
                    src={sunriseIcon}
                    alt=""
                />
                <p className='HeaderDetails-event'>{lang.sunrise}</p>
                <p className='HeaderDetails-time'>{getTime(sunrise)}</p>
            </div>
            <div>
                <img
                    className='HeaderDetails-icon'
                    src={sunsetIcon}
                    alt=""
                />
                <p className='HeaderDetails-event'>{lang.sunset}</p>
                <p className='HeaderDetails-time'>{getTime(sunset)}</p>
            </div>
        </div>
    )
}

export default HeaderDetails