import './HeaderDetails.css'
import sunriseIcon from '../images/sunrise-icon.svg'
import sunsetIcon from '../images/sunset-icon.svg'
import { getLocationTime } from '../js/utils'


const HeaderDetails = ({ lang, sunrise, sunset, UTCshift }) => {

    return (
        <div className='HeaderDetails'>
            <div>
                <img
                    className='HeaderDetails-icon'
                    src={sunriseIcon}
                    alt=""
                />
                <p className='HeaderDetails-event'>{lang.sunrise}</p>
                <p className='HeaderDetails-time'>{getLocationTime(sunrise, UTCshift)}</p>
            </div>
            <div>
                <img
                    className='HeaderDetails-icon'
                    src={sunsetIcon}
                    alt=""
                />
                <p className='HeaderDetails-event'>{lang.sunset}</p>
                <p className='HeaderDetails-time'>{getLocationTime(sunset, UTCshift)}</p>
            </div>
        </div>
    )
}

export default HeaderDetails