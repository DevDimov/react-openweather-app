import chevron from "../images/chevron-right-solid.svg"

const ScrollButton = (props) => {
    const {buttonClass, imgClass} = props
    
    const handleOnClick = (event) => {
        const button = event.currentTarget
        const element = event.currentTarget.parentElement.childNodes[0]
        if (button.className === "scroll-button-right") {
            element.scrollLeft += 170;
        }
        if (button.className === "scroll-button-left") {
            element.scrollLeft -= 170;
        }
    }

    return (
        <button className={buttonClass} onClick={handleOnClick}>
            <img className={imgClass} src={chevron} alt="chevron" />
        </button>
    )
}

export default ScrollButton
