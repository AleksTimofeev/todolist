import React, {useState} from 'react';
import Button from "@mui/material/Button";
import styles from './FilterTasks.module.css'
import {FilterTasksType} from "../Todolist";

type PropsType = {
  callbackChangeFilterTasks: (filter: FilterTasksType) => void
}

export const FilterTasks: React.FC<PropsType> = ({callbackChangeFilterTasks}) => {

  const [activeFilter, setActiveFilter] = useState('all')

  const handleChangeFilter = (filter: FilterTasksType) => {
    setActiveFilter(filter)
    callbackChangeFilterTasks(filter)
  }

  return (
    <div className={styles.wrapper}>
      <Button variant={activeFilter === 'all' ? "contained" : "outlined" } onClick={() => handleChangeFilter('all')}>All</Button>
      <Button variant={activeFilter === 'active' ? "contained" : "outlined" } onClick={() => handleChangeFilter('active')}>Active</Button>
      <Button variant={activeFilter === 'completed' ? "contained" : "outlined" } onClick={() => handleChangeFilter('completed')}>Completed</Button>
    </div>
  );
};
