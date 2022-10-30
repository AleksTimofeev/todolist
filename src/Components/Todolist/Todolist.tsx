import React, {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useEffect,
  useState
} from 'react';
import styles from './Todolist.module.scss'
import {TaskType, TodolistType} from "../../API/api";
import {useAppDispatch, useAppSelector} from "../../Store/store";
import {addTask, getTasksForTodolist, removeTask, updateTask} from "../../Store/taskReducer";
import Task from "./Task/Task";
import {removeTodolist, updateTodolist} from "../../Store/todolistsReducer";
import {RequestStatusType} from "../../Store/appReducer";
import {LinearProgress, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {AddCircle, Delete} from "@mui/icons-material";
import EditableSpan from "../EditableSpan/EditableSpan";

type PropsType = {
  data: TodolistType
  statusGetTaskForTodolist: RequestStatusType
  statusRemoveTodolist: RequestStatusType
  statusRemoveTask: RequestStatusType
  statusAddTask: RequestStatusType
  statusUpdateTodolist: RequestStatusType
}

const Todolist: React.FC<PropsType> = ({
                                         data,
                                         statusGetTaskForTodolist,
                                         statusRemoveTodolist,
                                         statusRemoveTask,
                                         statusAddTask,
                                         statusUpdateTodolist
                                       }) => {

  const {title} = data
  const idTodolist = data.id
  const dispatch = useAppDispatch()
  const taskList = useAppSelector(state => state.tasks[idTodolist])

  const [value, setValue] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }
  const handleOnEnter = (e: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim().length > 2) {
      dispatch(addTask({idTodolist, titleTask: value}))
      setValue('')
    }
  }
  const handleAddTask = () => {
    if (value.trim().length > 2) {
      dispatch(addTask({idTodolist, titleTask: value}))
      setValue('')
    }
  }

  const handleClickRemoveTodolist = () => {
    dispatch(removeTodolist({idTodolist}))
  }
  const callbackUpdateTodolist = (title: string) => {
    dispatch(updateTodolist({idTodolist, title}))
  }
  const callbackRemoveTask = (idTask: string) => {
    dispatch(removeTask({idTodolist, idTask}))
  }
  const callbackUpdateTask = (newTask: TaskType) => {
    dispatch(updateTask(newTask))
  }

  useEffect(() => {
    dispatch(getTasksForTodolist(idTodolist))
  },[])

  return (
    <div className={styles.todolistWrapper}>
      <div className={styles.todolistHeader}>
          <EditableSpan value={title} handleChangeText={callbackUpdateTodolist} />
        <IconButton
          onClick={handleClickRemoveTodolist}
          title={'remove todolist'}
          disabled={statusRemoveTodolist === 'loading'}
        >
          <Delete />
        </IconButton>
      </div>
      <div className={styles.loadingLinear}>
        {statusUpdateTodolist === 'loading' && <LinearProgress/>}
      </div>
      <div className={styles.addTask}>
        <TextField
          disabled={statusGetTaskForTodolist === 'loading'}
          id="standard-basic"
          label={'Add task'}
          variant="standard"
          size={'small'}
          value={value}
          onChange={handleChange}
          onKeyPress={handleOnEnter}
        />
        <IconButton
          size={'small'}
          onClick={handleAddTask}
          disabled={statusAddTask === 'loading' || statusGetTaskForTodolist === 'loading'}
        ><AddCircle color={'primary'}/></IconButton>
      </div>
      <div className={styles.tasksListWrapper}>
        {taskList && taskList.map(item => (
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