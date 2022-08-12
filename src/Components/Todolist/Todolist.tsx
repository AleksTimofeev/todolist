import React, {useEffect} from 'react';
import styles from './Todolist.module.scss'
import {TodolistType} from "../../API/api";
import {AppStateType, useAppDispatch} from "../../Store/store";
import {getTasksForTodolist} from "../../Store/taskReducer";
import {useSelector} from "react-redux";
import Task from "./Task/Task";
import {removeTodolist} from "../../Store/todolistsReducer";

type PropsType = {
  data: TodolistType
}

const Todolist: React.FC<PropsType> = ({data}) => {

  const {title, id} = data

  const dispatch = useAppDispatch()

  const tasks = useSelector((state: AppStateType) => state.tasks[id])

  const handleRemoveTodolist = () => {
    dispatch(removeTodolist(id))
  }

  useEffect(() => {
    dispatch(getTasksForTodolist(id))
  }, [])

  return (
    <div className={styles.todolistWrapper}>
      <div className={styles.todolistHeader}>
        <div className={styles.title}>{title}</div>
        <button onClick={handleRemoveTodolist}>X</button>
      </div>
      {tasks.length > 0 && tasks.map(item => (
        <Task key={item.id} {...item} />
      ))}
    </div>
  );
};

export default Todolist;