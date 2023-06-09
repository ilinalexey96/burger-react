import React from "react";
import styles from './order-details.module.css';
import image from '../../images/done.svg';
import { useSelector } from "../../utils/hooks";

export const OrderDetails = () => {
  const { id: orderId } = useSelector(state => state.orderDetails);
  const { orderSuccess: success } = useSelector(state => state.orderDetails)
  return (
    success ? (<div className={styles.order}>
      <h2 className={`${styles.title} text text_type_digits-large`}>{orderId}</h2>
      <h3 className={`${styles.subtitle} text text_type_main-medium`}>идентификатор заказа</h3>
      <img className={styles.image}
        src={image}
        alt='Заказ готовится'
      />
      <p className="text text_type_main-small">
        Ваш заказ начали готовить
      </p>
      <p className={`${styles.message} text text_type_main-small`} >
        Дождитесь готовности на орбитальной станции
      </p>
    </div>) : (<div className={styles.order}>
      <h3 className={`${styles.subtitle} text text_type_main-large`}>Ожидание...</h3>
    </div>)
  )
}