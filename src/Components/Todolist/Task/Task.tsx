import React, {useState} from 'react';
import {TaskType} from "../../../API/api";
import styles from './Task.module.scss'
import EditableText from "../../EditableText/EditableText";
import TaskDescription from "./TaskDescription";

type PropsType = {
  task: TaskType
  callbackUpdateTask: (newTask: TaskType) => void
  callbackRemoveTask: (idTask: string) => void
}

const Task: React.FC<PropsType> = ({task, callbackUpdateTask, callbackRemoveTask}) => {

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
      {/*<EditableText*/}
      {/*  className={styles.task}*/}
      {/*  value={task.title}*/}
      {/*  handleChangeText={updateTask}/>*/}
      {showDescription ? <TaskDescription data={task} /> : <span>{task.title}</span>}
      <button onClick={removeTask}>X</button>
    </div>

  );
};

export default Task;