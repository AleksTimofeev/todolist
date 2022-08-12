import React from 'react';
import {TaskType} from "../../../API/api";
import styles from './Task.module.scss'


const Task:React.FC<TaskType> = (props) => {

  const {title, id, todoListId} = props

  return (
    <div className={styles.wrapper}>
      {title}
    </div>
  );
};

export default Task;