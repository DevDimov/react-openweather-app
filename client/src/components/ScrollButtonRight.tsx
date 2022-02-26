import { MutableRefObject } from "react"
import chevron from "../images/chevron-right-solid.svg"

type ScrollRightButtonProps = {
    scrollRef: MutableRefObject<HTMLDivElement>
}

const ScrollButtonRight = ({ scrollRef }: ScrollRightButtonProps) => {

    const scroll = (shift: number) => {
        scrollRef.current.scrollLeft += shift
    }

    return (
        <button className="scroll-button-right" onClick={() => scroll(100)}>
            <img className="chevron-right" src={chevron} alt="chevron" />
        </button>
    )
}

export default ScrollButtonRight
