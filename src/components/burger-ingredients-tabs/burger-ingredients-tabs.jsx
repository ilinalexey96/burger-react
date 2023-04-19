import React from "react";
import styles from './burger-ingredients-tabs.module.css'
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

export function BurgerIngredientsTabs() {
    const [current, setCurrent] = React.useState('one')
    return (
        <div className={styles.listTab}>
            <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                One
            </Tab>
            <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                Two
            </Tab>
            <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                Three
            </Tab>
        </div>
    )
}