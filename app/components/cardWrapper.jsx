import React from 'react'
import styles from '../styles/cardWrapper.module.scss';

const CardWrapper = ({ children }) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}

export default CardWrapper;
