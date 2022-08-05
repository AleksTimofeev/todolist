import React from 'react';
import styles from './Header.module.scss'

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={'container'}>
        <h2>Header</h2>
      </div>
    </div>
  );
};

export default Header;