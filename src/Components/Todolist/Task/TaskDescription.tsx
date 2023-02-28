import React, {ChangeEvent, ChangeEventHandler, useState} from 'react';
import {TaskType} from "../../../API/api";
import EditableSpan from "../../EditableSpan/EditableSpan";
import styles from './TaskDescription.module.css'
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {useAppDispatch, useAppSelector} from "../../../Store/store";
import {closeTaskDescription} from "../../../Store/appReducer";
import Textarea from '@mui/joy/Textarea';
import {getDateForRender} from "../../../utils/getDateForRender";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

type PropsType = {
  data: TaskType
  callbackUpdateTask: (newTask: TaskType) => void
}

export const TaskDescription: React.FC<PropsType> = ({
                                                       data,
                                                       callbackUpdateTask
                                                     }) => {

  const dispatch = useAppDispatch()
  const taskStatus = useAppSelector(state => state.app.taskStatus.find(t => t.idTask === data.id))
  const [taskTitle, setTaskTitle] = useState(data.title)
  const [descriptionValue, setDescriptionValue] = useState<string>(data.description ? data.description : '')
  const [deadline, setDeadline] = useState<string | null>(data.deadline ? data.deadline : null)
  const taskAddedDate = getDateForRender(data.addedDate)
  const taskDeadline = deadline ? getDateForRender(deadline) : ''


  const updateTaskTitle = (updateTitle: string) => {
    setTaskTitle(updateTitle)
  }

  const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionValue(e.currentTarget.value)
  }

  const handleCloseDescription = () => {
    dispatch(closeTaskDescription())
  }

  const handleAddDateDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeadline(e.currentTarget.value)
  }

  const handleSaveTask = () => {
    const newTask = {...data, description: descriptionValue, deadline: deadline}
    callbackUpdateTask(newTask)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperDescription}>
        <IconButton
          className={styles.closeDescription}
          disabled={taskStatus?.status === 'loading'}
          onClick={handleCloseDescription}
        >
          <HighlightOffIcon color={'error'}/>
        </IconButton>
        <div className={styles.taskHeader}>
          <EditableSpan
            className={styles.title}
            value={taskTitle}
            handleChangeText={updateTaskTitle}
          />
          <span>{taskAddedDate}</span>
        </div>
        <Textarea
          className={styles.taskDescriptionInput}
          placeholder={'task description...'}
          minRows={2}
          value={descriptionValue}
          onChange={handleChangeDescription}
        />

        <div className={styles.deadlineWrapper}>
          <span>deadline - {taskDeadline}</span>
          <div className={styles.deadlineInputContainer}>
            <input type={"date"} onChange={handleAddDateDeadline}/>
            <IconButton className={styles.deadlineCalendarIcon}>
              <CalendarMonthIcon/>
            </IconButton>
          </div>
        </div>

        <Button
          variant={'contained'}
          disabled={taskStatus?.status === 'loading'}
          onClick={handleSaveTask}
        >
          save
        </Button>

      </div>
    </div>
  );
}