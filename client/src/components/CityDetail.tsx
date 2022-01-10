import type { CityDetailProps } from "../typescript/ComponentTypes"

const CityDetail = ({ title, value }: CityDetailProps) => {

    return (
        <div>
            <p>{title}</p>
            <h3>{value}</h3>
        </div>
    )
}

export default CityDetail