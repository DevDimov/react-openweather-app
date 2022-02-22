import { useState } from "react"
import styles from './SelectMenu.module.css'

export const SelectMenu = ({ label, options, optionsText, selected }) => {

    const handleOnChange = (e) => {
        let selectedOption = e.target.value
        if (selectedOption !== selected) {

        }
    }

    return (
        <div className={styles.container}>
            
            <label htmlFor={label}>{label}</label>
            
            <select
                name={label}
                id={label}
                className={styles.selectMenu}
                onChange={(e) => { console.log(e.target.value) }}
            >
                <option defaultValue hidden value={selected}>
                    {optionsText[selected]}
                </option>
                
                {
                    options.map((option) => {
                        return (
                            <option
                                key={option.value}
                                value={option.value}
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