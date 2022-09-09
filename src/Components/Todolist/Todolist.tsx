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
import {RequestStatusType} from "../../Store/appReducer";
import {LinearProgress} from "@mui/material";

type PropsType = {
  data: TodolistType
  statusGetTaskForTodolist: RequestStatusType
  statusRemoveTodolist: RequestStatusType
  statusRemoveTask: RequestStatusType
}

const Todolist: React.FC<PropsType> = ({data,
                                         statusGetTaskForTodolist,
                                         statusRemoveTodolist,
                                         statusRemoveTask
}) => {

  const {title} = data
  const idTodolist = data.id
  const dispatch = useAppDispatch()
  const taskList = useSelector((state: AppStateType): Array<TaskType> => state.tasks[idTodolist])

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
        {statusGetTaskForTodolist === 'loading' ?
          <h3>Loading</h3> :
          <EditableText value={title} handleChangeText={callbackUpdateTodolist}/>
        }
        <button onClick={handleClickRemoveTodolist}
                title={'remove todolist'}
                disabled={statusRemoveTodolist === 'loading'}
        >
          X
        </button>
      </div>
      {statusGetTaskForTodolist === 'loading' && <LinearProgress/>}
      <div>
        <AddItem callbackAddItem={callbackAddTask}
                 title={'Add Task'}
                 size={'small'}
                 disabled={statusGetTaskForTodolist === 'loading'}
        />
      </div>
      <div className={styles.tasksListWrapper}>
        {taskList.length > 0 && taskList.map(item => (
          <Task
            key={item.id}
            task={item}
            callbackUpdateTask={callbackUpdateTask}
            callbackRemoveTask={callbackRemoveTask}
            statusRemoveTask={statusRemoveTask}
          />
        ))}
      </div>
    </div>
  );
};

export default Todolist;