import React, {useEffect} from 'react';
import styles from './Todolist.module.scss'
import {TodolistType} from "../../API/api";
import {AppStateType, useAppDispatch} from "../../Store/store";
import {getTasksForTodolist} from "../../Store/taskReducer";
import {useSelector} from "react-redux";
import Task from "./Task/Task";

type PropsType = {
  data: TodolistType
}

const Todolist:React.FC<PropsType> = ({data}) => {

  const {title, id} = data

  const dispatch = useAppDispatch()

  const tasks = useSelector((state: AppStateType) => state.tasks[id])

  useEffect(() => {
    dispatch(getTasksForTodolist(id))
  },[])

  return (
    <div className={styles.todolistWrapper}>
      <div className={styles.title}>{title}</div>
      {tasks.length > 0 && tasks.map(item => (
        <Task key={item.id} {...item} />
      ))}
    </div>
  );
};

export default Todolist;