import chevron from "../images/chevron-right-solid.svg"

type ScrollButtonProps = {
    buttonClass: string,
    imgClass: string,
    scroll: (shift: number) => void,
    direction: string
}

const ScrollButton = ({ buttonClass, imgClass, scroll, direction }: ScrollButtonProps) => {

    const handleOnClick = () => {
        if (direction === 'left') {
            scroll(-100)
        }
        if (direction === 'right') {
            scroll(100)
        }
    }

    return (
        <button className={buttonClass} onClick={handleOnClick}>
            <img className={imgClass} src={chevron} alt="chevron" />
        </button>
    )
}

export default ScrollButton
