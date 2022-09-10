import React, {useEffect} from 'react';
import styles from './Logon.module.scss'
import {useSelector} from "react-redux";
import {AppStateType} from "../../Store/store";
import {useNavigate} from "react-router-dom";

const Login = () => {

  const isLogged = useSelector((state: AppStateType) => state.authReducer.isLogged)
  const navigate = useNavigate()


  useEffect(() => {
    if(isLogged){
      navigate('/')
    }
  },[])

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