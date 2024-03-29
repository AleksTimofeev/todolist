import React from 'react';
import {TaskType} from "../../../API/api";
import styles from './Task.module.scss'
import EditableSpan from "../../EditableSpan/EditableSpan";
import {RequestStatusType, showTaskDescription} from "../../../Store/appReducer";
import IconButton from "@mui/material/IconButton";
import {Delete, OpenInFull} from "@mui/icons-material";
import {Checkbox} from "@mui/material";
import {TaskDescription} from "./TaskDescription";
import {useAppDispatch, useAppSelector} from "../../../Store/store";
import {getDateForRender} from "../../../utils/getDateForRender";


type PropsType = {
  task: TaskType
  taskStatus: RequestStatusType | undefined
  callbackUpdateTask: (newTask: TaskType) => void
  callbackRemoveTask: (idTask: string) => void
}

const Task: React.FC<PropsType> = ({
                                     task,
                                     callbackUpdateTask,
                                     callbackRemoveTask,
                                     taskStatus
                                   }) => {

  const taskDescription = useAppSelector(store => store.app.showTaskDescription)
  const dispatch = useAppDispatch()
  const deadlineForRender = getDateForRender(task.deadline!)

  const updateTaskTitle = (title: string) => {
    if (title.length > 2) {
      const newTask = {...task, title}
      callbackUpdateTask(newTask)
    }
  }
  const updateTaskDescription = (description: string) => {
    const newTask = {...task, description}
    callbackUpdateTask(newTask)
  }

  const handleChangeStatus = () => {
    const newStatus = task.status === 0 ? 1 : 0
    callbackUpdateTask({...task, status: newStatus})
  }
  const removeTask = () => {
    callbackRemoveTask(task.id)
  }

  const showDescription = () => {
    dispatch(showTaskDescription({idTask: task.id}))
  }

  return (
    <div className={styles.wrapper}>
      {taskDescription === task.id &&
        <TaskDescription
          data={task}
          callbackUpdateTask={callbackUpdateTask}
        />}
      <Checkbox
        checked={task.status === 1}
        onChange={handleChangeStatus}
        disabled={taskStatus && taskStatus === 'loading'}
      />
      <div className={styles.taskTitle} title={task.description ? task.description : ''}>
        <span>{task.title}</span>
        {task.deadline && <span className={styles.deadline}>deadline - {deadlineForRender}</span>}
      </div>
      <IconButton
        size={'small'}
        style={{marginLeft: 'auto'}}
        onClick={showDescription}
        title={'show description'}
      >
        <OpenInFull />
      </IconButton>
      <IconButton
        size={'small'}
        disabled={taskStatus && taskStatus === 'loading'} onClick={removeTask}
        title={'delete task'}
      >
        <Delete/>
      </IconButton>
    </div>

  );
};

export default Task