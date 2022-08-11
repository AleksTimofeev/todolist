import React from 'react';
import styles from './Todolist.module.scss'
import {TodolistType} from "../../API/api";

type PropsType = {
  data: TodolistType
}

const Todolist:React.FC<PropsType> = ({data}) => {

  const {title, id} = data

  return (
    <div className={styles.todolistWrapper}>
      <div className={styles.title}>{title}</div>
    </div>
  );
};

export default Todolist;