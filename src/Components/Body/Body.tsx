import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import TodolistContainer from "../Todolist/TodolistContainer";
import styles from './Body.module.scss'
import {useSelector} from "react-redux";
import {AppStateType} from "../../Store/store";

const Body = () => {

  const isLogged = useSelector((state: AppStateType) => state.authReducer.isLogged)
  const navigate = useNavigate()

    useEffect(() => {
      if(!isLogged){
        navigate('/login')
      }
    },[])

  return (
    <div className={styles.body}>
      <div className={'container'}>
        <TodolistContainer />
      </div>
    </div>
  );
};

export default Body;