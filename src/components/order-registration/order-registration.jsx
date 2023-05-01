import styles from './order-registration.module.css';
import { PropTypes } from 'prop-types';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export function OrderRegistration({ handleOrderClick }) {

    const main = useSelector(state => state.burgerConstructor.mainList)
    const buns = useSelector(state => state.burgerConstructor.bunsList)

    const totalOrderAmount = useMemo(() => (
        main.reduce((acc, { price }) => acc + price, 0) + (buns.reduce((acc, { price }) => acc + price, 0) * 2)
    ), [main, buns]);

    return (
        <div className={`${styles.order_registration} mt-10 mr-4`}>
            <div className={styles.order_cost}>
                <p className="text text_type_digits-medium mr-2">{totalOrderAmount}</p>
                <CurrencyIcon type="primary" />
            </div>
            <Button onClick={handleOrderClick} type="primary" size="large" htmlType="button">Оформить заказ</Button>
        </div>
    )
}

OrderRegistration.propTypes = {
    handleOrderClick: PropTypes.func.isRequired
}