import React from 'react';
import {TaskType} from "../../../API/api";
import styles from './Task.module.scss'
import EditableText from "../../EditableText/EditableText";

type PropsType = {
  task: TaskType
  callbackUpdateTask: (newTask: TaskType) => void
  callbackRemoveTask: (idTask: string) => void
}

const Task: React.FC<PropsType> = ({task, callbackUpdateTask, callbackRemoveTask}) => {

  const updateTask = (title: string) => {
    if (title.length > 2) {
      const newTask = {...task, title}
      callbackUpdateTask(newTask)
    }
  }
  const removeTask = () => {
    callbackRemoveTask(task.id)
  }

  return (
    <div className={styles.wrapper}>
      <EditableText value={task.title} type={'text'} handleChangeText={updateTask}/>
      <button onClick={removeTask}>X</button>
    </div>

  );
};

export default Task;