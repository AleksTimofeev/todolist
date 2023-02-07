import React from 'react';
import {TaskType} from "../../../API/api";
import EditableSpan from "../../EditableSpan/EditableSpan";
import styles from './TaskDescription.module.css'
import IconButton from "@mui/material/IconButton";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {useAppDispatch} from "../../../Store/store";
import {closeTaskDescription} from "../../../Store/appReducer";
import Textarea from '@mui/joy/Textarea';

type PropsType = {
  data: TaskType
  updateTaskTitle: (title: string) => void
  updateTaskDescription: (description: string) => void
}

export const TaskDescription: React.FC<PropsType> = ({data, updateTaskTitle, updateTaskDescription}) => {

  const dispatch = useAppDispatch()

  const handleCloseDescription = () => {
    dispatch(closeTaskDescription())
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperDescription}>
        <IconButton
          className={styles.closeDescription}
          onClick={handleCloseDescription}
        >
          <HighlightOffIcon color={'error'}/>
        </IconButton>
        <EditableSpan
          value={data.title}
          handleChangeText={updateTaskTitle}
        />
        <Textarea
          placeholder={'task description...'}
          minRows={2}
        />
        {/*{!!data.description && <EditableSpan value={data.description} handleChangeText={updateTaskDescription}/>}*/}
        <span>{data.addedDate}</span>
      </div>
    </div>
  );
}