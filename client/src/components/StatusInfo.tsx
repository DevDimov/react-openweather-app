import styles from './StatusInfo.module.css'

type StatusInfoProps = {
    text: string,
    icon: string
}

const StatusInfo = ({ text, icon }: StatusInfoProps) => {
    return (
        <p className='display-flex'>
            <img
                // icons must be the same height for the style.icon class to work
                className={styles.icon}
                src={text ? icon : undefined}
                alt={text ? "Status info icon" : undefined}
            />
            {text}
        </p>
    )
}

export default StatusInfo