import React from 'react';
import styles from './Logon.module.scss'

const Login = () => {

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <input type={'text'} placeholder={'login'}/>
        <input type={'password'} placeholder={'password'}/>
        <div className={styles.buttons}>
          <button>login</button>
          <button>Crate new account</button>
        </div>
      </div>
    </div>
  );
};

export default Login;