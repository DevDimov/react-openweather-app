import styles from './SelectMenu.module.css'

export const SelectMenu = ({ label, options, optionsText, selected, forwardRef, setUpdateDisabled }) => {

    const handleOnChange = (e) => {
        let selectedOption = e.target.value
        if (selectedOption !== selected) {
            setUpdateDisabled(false)
        }
    }

    return (
        <div className={styles.container}>

            <label htmlFor={label}>{label}</label>

            <select
                name={label}
                id={label}
                ref={forwardRef}
                className={styles.selectMenu}
                onChange={(e) => handleOnChange(e)}
            >
                <option defaultValue hidden value={selected}>
                    {options.filter(option => option.value === selected)[0].text}
                </option>

                {
                    options.map((option) => {
                        return (
                            <option
                                key={option.value}
                                value={option.value}
                                hidden={option.value === 'mixed' ? true : false}
                            >
                                {option.text}
                            </option>
                        )
                    })
                }

            </select>
        </div>
    )
}