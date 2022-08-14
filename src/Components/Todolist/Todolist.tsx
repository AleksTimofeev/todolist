import React, {useEffect, useState} from 'react';
import styles from './Todolist.module.scss'
import {TaskType, TodolistType} from "../../API/api";
import {AppStateType, useAppDispatch} from "../../Store/store";
import {addTask, getTasksForTodolist, removeTask, updateTask} from "../../Store/taskReducer";
import {useSelector} from "react-redux";
import Task from "./Task/Task";
import {removeTodolist, updateTodolist} from "../../Store/todolistsReducer";
import EditableText from "../EditableText/EditableText";
import AddItem from './AddItem';

type PropsType = {
  data: TodolistType
}

const Todolist: React.FC<PropsType> = ({data}) => {

  const {title} = data
  const idTodolist = data.id
  const dispatch = useAppDispatch()
  const taskList = useSelector((state: AppStateType):Array<TaskType> => state.tasks[idTodolist])

  const handleClickRemoveTodolist = () => {
    dispatch(removeTodolist(idTodolist))
  }
  const callbackUpdateTodolist = (title: string) => {
    dispatch(updateTodolist(idTodolist, title))
  }
  const callbackAddTask = (title: string) => {
    dispatch(addTask(idTodolist, title))
  }
  const callbackRemoveTask = (idTask: string) => {
    dispatch(removeTask(idTodolist, idTask))
  }
  const callbackUpdateTask = (newTask: TaskType) => {
    dispatch(updateTask(newTask))
  }

  useEffect(() => {
    dispatch(getTasksForTodolist(idTodolist))
  }, [])

  return (
    <div className={styles.todolistWrapper}>
      <div className={styles.todolistHeader}>
        <EditableText value={title} type={'title'} handleChangeText={callbackUpdateTodolist}/>
        <button onClick={handleClickRemoveTodolist} title={'remove todolist'}>X</button>
      </div>
      <div>
        <AddItem callbackAddItem={callbackAddTask} />
      </div>
      <div className={styles.tasksListWrapper}>
      {taskList.length > 0 && taskList.map(item => (
        <Task
          key={item.id}
          task={item}
          callbackUpdateTask={callbackUpdateTask}
          callbackRemoveTask={callbackRemoveTask}/>
      ))}
      </div>
    </div>
  );
};

export default Todolist;