import React from 'react';
import {TaskType} from "../../../API/api";
import styles from './Task.module.scss'
import EditableSpan from "../../EditableSpan/EditableSpan";
import {RequestStatusType} from "../../../Store/appReducer";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";
import {Checkbox} from "@mui/material";
import {useAppSelector} from "../../../Store/store";

type PropsType = {
  task: TaskType
  callbackUpdateTask: (newTask: TaskType) => void
  callbackRemoveTask: (idTask: string) => void
  statusRemoveTask: RequestStatusType
}

const Task: React.FC<PropsType> = ({task, callbackUpdateTask, callbackRemoveTask, statusRemoveTask}) => {

  const taskStatus = useAppSelector(state => state.app.taskStatus).find(t => t.idTask === task.id)?.status

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

  const wrapperStyle = `${styles.wrapper} ${taskStatus && taskStatus === 'loading' ? styles.statusLoading : ''}`

  return (
    <div className={wrapperStyle}>
      <Checkbox
        checked={task.status === 1}
        onChange={handleChangeStatus}
        disabled={taskStatus && taskStatus === 'loading'}
      />
      <EditableSpan
        className={styles.task}
        value={task.title}
        handleChangeText={updateTaskTitle}/>
      <IconButton
        size={'small'}
        disabled={taskStatus && taskStatus === 'loading'} onClick={removeTask}
      >
        <Delete />
      </IconButton>
    </div>

  );
};

export default Task;