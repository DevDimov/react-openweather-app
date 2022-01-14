type CityDetailProps = {
    title: string,
    value: string
}

const CityDetail = ({ title, value }: CityDetailProps) => {
    return (
        <div>
            <p>{title}</p>
            <h3>{value}</h3>
        </div>
    )
}

export default CityDetail