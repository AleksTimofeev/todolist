import React, {useEffect} from 'react';
import styles from './Todolist.module.scss'
import {TodolistType} from "../../API/api";
import {AppStateType, useAppDispatch} from "../../Store/store";
import {getTasksForTodolist} from "../../Store/taskReducer";
import {useSelector} from "react-redux";
import Task from "./Task/Task";
import {removeTodolist, updateTodolist} from "../../Store/todolistsReducer";
import EditableText from "../EditableText/EditableText";

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

  const handleChangeTitle = (title: string) => {
    dispatch(updateTodolist(id, title))
  }

  useEffect(() => {
    dispatch(getTasksForTodolist(id))
  }, [])

  return (
    <div className={styles.todolistWrapper}>
      <div className={styles.todolistHeader}>
        <EditableText value={title} type={'title'} handleChangeText={handleChangeTitle}/>
        <button onClick={handleRemoveTodolist} title={'remove todolist'}>X</button>
      </div>
      {tasks.length > 0 && tasks.map(item => (
        <Task key={item.id} task={item}/>
      ))}
    </div>
  );
};

export default Todolist;