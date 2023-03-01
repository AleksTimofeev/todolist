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
import {addTodolist, removeTodolist, updateTodolist} from "../../Store/todolistsReducer";
import {LinearProgress, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {AddCircle, Delete} from "@mui/icons-material";
import EditableSpan from "../EditableSpan/EditableSpan";
import EditIcon from '@mui/icons-material/Edit';
import {FilterTasks} from "./FilterTasks/FilterTasks";

type PropsType = {
  data: TodolistType
}
export type FilterTasksType = 'all' | 'completed' | 'active'

const Todolist: React.FC<PropsType> = ({data}) => {

  const {title} = data
  const idTodolist = data.id
  const dispatch = useAppDispatch()
  const taskList = useAppSelector(state => state.tasks[idTodolist])
  const todolistStatus = useAppSelector(state => state.app.todolistStatus.find(td => td.idTodolist === idTodolist))
  const taskStatus = useAppSelector(state => state.app.taskStatus).filter(item => item.idTodolist === idTodolist)

  const [value, setValue] = useState('')
  const [titleValue, setTitleValue] = useState(title)
  const [showTitleInput, setShowTitleInput] = useState(false)
  const [filterTasks, setFilterTasks] = useState('all')

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
  const handleClickChangeTitle = () => {
    setShowTitleInput(!showTitleInput)
  }
  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTitleValue(e.currentTarget.value)
  }
  const handleOnEnterTitle = (e: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
    if (e.key === 'Enter' && titleValue.trim().length > 2) {
      dispatch(updateTodolist({idTodolist, title: titleValue}))
      setShowTitleInput(false)
    }
  }
  // const handleBlurTitleInput = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
  //   console.log(e.currentTarget)
  // }
  const callbackRemoveTask = (idTask: string) => {
    dispatch(removeTask({idTodolist, idTask}))
  }
  const callbackUpdateTask = (newTask: TaskType) => {
    dispatch(updateTask(newTask))
  }
  const callbackChangeFilterTasks = (filter: FilterTasksType) => {
    setFilterTasks(filter)
  }

  useEffect(() => {
    dispatch(getTasksForTodolist(idTodolist))
  }, [])

  return (
    <div className={styles.todolistWrapper}>
      <div className={styles.todolistHeader}>

        {showTitleInput ?
          <TextField
            id="standard-basic"
            label={'edit'}
            variant="standard"
            size={'small'}
            value={titleValue}
            onChange={handleChangeTitle}
            onKeyPress={handleOnEnterTitle}
            // onBlur={handleBlurTitleInput}
          /> :
          <span className={styles.title}>{title}</span>
        }
        <IconButton
          onClick={handleClickChangeTitle}
        >
          <EditIcon/>
        </IconButton>
        <IconButton
          onClick={handleClickRemoveTodolist}
          title={'remove todolist'}
          disabled={todolistStatus?.status === 'loading'}
        >
          <Delete/>
        </IconButton>
      </div>
      <div className={styles.loadingLinear}>
        {todolistStatus?.status === 'loading' && <LinearProgress/>}
      </div>
      <div className={styles.addTask}>
        <TextField
          disabled={todolistStatus?.status === 'loading'}
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
          disabled={todolistStatus?.status === 'loading'}
        ><AddCircle color={'primary'}/></IconButton>
      </div>
      <div className={styles.tasksListWrapper}>
        {taskList && taskList.filter(task => {
          if (filterTasks === 'active') {
            return task.status === 0
          }
          if (filterTasks === 'completed') {
            return task.status === 1
          } else {
            return task
          }
        }).map(item => (
          <Task
            key={item.id}
            task={item}
            taskStatus={taskStatus.find(i => i.idTask === item.id)?.status}
            callbackUpdateTask={callbackUpdateTask}
            callbackRemoveTask={callbackRemoveTask}
          />
        ))}
      </div>
      <FilterTasks callbackChangeFilterTasks={callbackChangeFilterTasks}/>
    </div>
  );
};

export default Todolist;