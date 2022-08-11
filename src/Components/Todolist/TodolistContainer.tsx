import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {AppStateType, useAppDispatch} from "../../Store/store";
import {getTodolists} from "../../Store/todolistsReducer";
import Todolist from "./Todolist";
import styles from './Todolist.module.scss'

const TodolistContainer = () => {

  const dispatch = useAppDispatch()
  const todolists = useSelector((state: AppStateType) => state.todolists)

  useEffect(() => {
    dispatch(getTodolists())
  },[])

  return (
    <div className={styles.todolistContainer}>
      {todolists.length > 0 && todolists.map(item => (
        <Todolist key={item.id} data={item} />
      ))}
    </div>
  );
};

export default TodolistContainer;