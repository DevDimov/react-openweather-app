type StatusInfoProps = {
    text: string,
    icon: string
}

const StatusInfo = ({ text, icon }: StatusInfoProps) => {
    return (
        <p id="status-info-paragraph">
            <img
                className="status-info-icon"
                src={text ? icon : undefined}
                alt={text ? "Status Info Icon" : undefined}
            />
            {text}
        </p>
    )
}

export default StatusInfo