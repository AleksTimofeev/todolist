import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {AppStateType, useAppDispatch} from "../../Store/store";
import {getTodolists} from "../../Store/todolistsReducer";
import Todolist from "./Todolist";
import styles from './Todolist.module.scss'
import AddTodolist from "./AddTodolist";

const TodolistContainer = () => {

  const dispatch = useAppDispatch()
  const todolists = useSelector((state: AppStateType) => state.todolists)

  const [showAddTodolistForm, setShowAddTodolistForm] = useState(false)

  const handleClickAddtodolist = () => {
    setShowAddTodolistForm(true)
  }

  const callbackOnEnter = () => {
    setShowAddTodolistForm(false)
  }

  useEffect(() => {
    dispatch(getTodolists())
  }, [])

  return (
    <div className={styles.todolistContainer}>
      <div className={styles.headerTodolistContainer}>
        <button onClick={handleClickAddtodolist}>add todolist</button>
        {showAddTodolistForm && <AddTodolist callbackOnEnter={callbackOnEnter}/>}
      </div>
      {todolists.length > 0 && todolists.map(item => (
        <Todolist key={item.id} data={item}/>
      ))}
    </div>
  );
};

export default TodolistContainer;