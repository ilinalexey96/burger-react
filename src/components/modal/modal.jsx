import React from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '../modal-overlay/modal-overlay';

export function Modal({ children, onClose }) {
    React.useEffect(() => {
        function onKeyDown(evt) {
            if (evt.key === 'Escape') {
                onClose()
            }
        }
        document.addEventListener('keydown', onKeyDown)

        return() => {
            document.removeEventListener('keydown', onKeyDown)
        }
    }, [])

    return createPortal(
        <>
        <ModalOverlay onClose={onClose} />
        <div className={styles.modal}>
            <button className={styles.closeButton} onClick={onclose}>
                <CloseIcon type='primary' />
            </button>
            {children}
        </div>
        </>,
        document.getElementById('modals')
    )
}