import React, {useState} from 'react';
import {TaskType} from "../../../API/api";
import styles from './Task.module.scss'
import EditableSpan from "../../EditableSpan/EditableSpan";
import TaskDescription from "./TaskDescription";
import {RequestStatusType} from "../../../Store/appReducer";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";

type PropsType = {
  task: TaskType
  callbackUpdateTask: (newTask: TaskType) => void
  callbackRemoveTask: (idTask: string) => void
  statusRemoveTask: RequestStatusType
}

const Task: React.FC<PropsType> = ({task, callbackUpdateTask, callbackRemoveTask, statusRemoveTask}) => {

  const [showDescription, setShowDescription] = useState(false)

  const updateTask = (title: string) => {
    if (title.length > 2) {
      const newTask = {...task, title}
      callbackUpdateTask(newTask)
    }
  }
  const removeTask = () => {
    callbackRemoveTask(task.id)
  }

  const handleShowDescription = () => {
    setShowDescription(true)
  }

  const style = task.status === 1 ? styles.middle : task.status === 2 ? styles.high : styles.low

  return (
    <div onDoubleClick={handleShowDescription} className={`${styles.wrapper} ${style}`}>
      <EditableSpan
        className={styles.task}
        value={task.title}
        handleChangeText={updateTask}/>
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