import React, {useState} from 'react';
import {TaskType} from "../../../API/api";
import styles from './Task.module.scss'
import EditableSpan from "../../EditableSpan/EditableSpan";
import TaskDescription from "./TaskDescription";
import {RequestStatusType} from "../../../Store/appReducer";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";
import {Checkbox} from "@mui/material";

type PropsType = {
  task: TaskType
  callbackUpdateTask: (newTask: TaskType) => void
  callbackRemoveTask: (idTask: string) => void
  statusRemoveTask: RequestStatusType
}

const Task: React.FC<PropsType> = ({task, callbackUpdateTask, callbackRemoveTask, statusRemoveTask}) => {

  const [showDescription, setShowDescription] = useState(false)

  const updateTaskTitle = (title: string) => {
    if (title.length > 2) {
      const newTask = {...task, title}
      callbackUpdateTask(newTask)
    }
  }
  const handleChangeStatus = () => {
    const newStatus = task.status === 0 ? 1 : 0
    callbackUpdateTask({...task, status: newStatus})
  }
  const removeTask = () => {
    callbackRemoveTask(task.id)
  }

  const handleShowDescription = () => {
    setShowDescription(true)
  }

  return (
    <div onDoubleClick={handleShowDescription} className={`${styles.wrapper}`}>
      <Checkbox checked={task.status === 1} onChange={handleChangeStatus}/>
      <EditableSpan
        className={styles.task}
        value={task.title}
        handleChangeText={updateTaskTitle}/>
      {/*{showDescription ? <TaskDescription data={task} /> : <span>{task.title}</span>}*/}
      {/*<button disabled={statusRemoveTask === 'loading'} onClick={removeTask}>X</button>*/}
      <IconButton
        size={'small'}
        disabled={statusRemoveTask === 'loading'} onClick={removeTask}
      >
        <Delete />
      </IconButton>
    </div>

  );
};

export default Task;