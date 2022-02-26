const IconButton = ({ buttonClass, onClick, iconClass, iconPath, altText }) => {
    return (
        <button className={buttonClass} onClick={onClick}>
            <img
                className={iconClass}
                src={iconPath}
                alt={altText}
            />
        </button>
    )
}

export default IconButton