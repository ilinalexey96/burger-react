import React from 'react';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor-element.module.css';
import { useDrop, useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/types';
import { useDispatch } from 'react-redux';
import { moveConstructorItem } from '../../services/actions/constructor';

export default function BurgerElement({ element, id, index, deleteElement }) {
    const dispatch = useDispatch();
    const moveElement = React.useCallback((dragIndex, hoverIndex) => {
        dispatch(moveConstructorItem(dragIndex, hoverIndex))
    }, [dispatch])

    const [{ handlerId }, drop] = useDrop({
        accept: 'item',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId()
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index;
            const hoverIndex = index
            if (dragIndex === hoverIndex) {
                return
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            moveElement(dragIndex, hoverIndex)
            item.index = hoverIndex
        }
    })

    const [{ isDragging }, drag] = useDrag({
        type: 'item',
        item: () => {
            return { id, index }
        },

        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        }),

    })
    const ref = React.useRef(null);
    drag(drop(ref));
    const options = {
        text: element.name,
        price: element.price,
        thumbnail: element.image,

        id: element.id,
    }

    return (
        <div className={styles.box}
            ref={ref}
            style={{
                opacity: isDragging ? 0.5 : 1
            }}
            {...options}
            data-handler-id={handlerId}
        >
            <div className={styles.drag}><DragIcon type="primary" /></div>
            <div className={styles.element} >
                <ConstructorElement
                    handleClose={() => deleteElement(element)}
                    {...options}
                />
            </div>
        </div>
    )
}

BurgerElement.propTypes = {
    element: ingredientType.isRequired,
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    deleteElement: PropTypes.func.isRequired,
}