import React from 'react';
import styles from './ScssTest.module.scss';

const ScssTest = () => {
  return (
    <div className={styles.test__container}>
      <h2 className={styles.test__heading}>SCSS Module Test Component</h2>
      <p className={styles.test__content}>This component uses SCSS module styles.</p>
    </div>
  );
};

export default ScssTest;
