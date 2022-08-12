import React from 'react';
import {TaskType} from "../../../API/api";
import styles from './Task.module.scss'
import EditableText from "../../EditableText/EditableText";
import {updateTask} from "../../../Store/taskReducer";
import {useAppDispatch} from "../../../Store/store";

type PropsType = {
  task: TaskType
}

const Task:React.FC<PropsType> = (props) => {

  const dispatch = useAppDispatch()

  const handleUpdateTask = (text: string) => {
    if(text.length > 2){
      dispatch(updateTask({...props.task, title: text}))
    }
  }

  return (
    <div className={styles.wrapper}>
      <EditableText value={props.task.title} type={'text'} handleChangeText={handleUpdateTask} />
    </div>
  );
};

export default Task;