import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {AppStateType, useAppDispatch, useAppSelector} from "../../Store/store";
import {addTodolist, FullTodolistType, getTodolists} from "../../Store/todolistsReducer";
import Todolist from "./Todolist";
import styles from './Todolist.module.scss'
import {TextField} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import {AddCircle} from "@mui/icons-material";

const TodolistContainer = () => {

  const dispatch = useAppDispatch()
  const todolists = useSelector((state: AppStateType):FullTodolistType => state.todolists)
  const appStatus = useAppSelector(state => state.app.appStatus)
  const [value, setValue] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }
  const handleOnEnter = (e: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim().length > 2) {
      dispatch(addTodolist(value))
      setValue('')
    }
  }
  const handleAddTodolist = () => {
    if(value.trim().length > 2){
      dispatch(addTodolist(value))
      setValue('')
    }
  }

  useEffect(() => {
    dispatch(getTodolists())
  }, [])

  return (
    <div className={styles.todolistContainer}>
      <div className={styles.headerTodolistContainer}>
        <TextField
          id="standard-basic"
          label={'Add todolist'}
          variant="standard"
          size={'small'}
          value={value}
          onChange={handleChange}
          onKeyPress={handleOnEnter}
          />
        <IconButton
                size={'small'}
                onClick={handleAddTodolist}
                disabled={appStatus === 'loading'}
        ><AddCircle color={'primary'} /></IconButton>
      </div>
      {todolists.length > 0 && todolists.map(item => (
        <Todolist key={item.id}
                  data={item}
        />
      ))}
    </div>
  );
};

export default TodolistContainer;