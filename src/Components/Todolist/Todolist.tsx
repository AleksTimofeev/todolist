import React, {useEffect, useState} from 'react';
import styles from './Todolist.module.scss'
import {TaskType, TodolistType} from "../../API/api";
import {AppStateType, useAppDispatch} from "../../Store/store";
import {getTasksForTodolist} from "../../Store/taskReducer";
import {useSelector} from "react-redux";
import Task from "./Task/Task";
import {removeTodolist, updateTodolist} from "../../Store/todolistsReducer";
import EditableText from "../EditableText/EditableText";
import AddTask from "./Task/AddTask";

type PropsType = {
  data: TodolistType
}

const Todolist: React.FC<PropsType> = ({data}) => {

  const {title, id} = data
  const dispatch = useAppDispatch()
  const taskList = useSelector((state: AppStateType):Array<TaskType> => state.tasks[id])

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
      <div>
        {/*<button onClick={handleAddTask}>+</button>*/}
        <AddTask idTodolist={id} />
      </div>
      <div className={styles.tasksListWrapper}>
      {taskList.length > 0 && taskList.map(item => (
        <Task key={item.id} task={item}/>
      ))}
      </div>
    </div>
  );
};

export default Todolist;