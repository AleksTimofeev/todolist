import React from 'react';
import {TaskType} from "../../../API/api";

const Task:React.FC<TaskType> = (props) => {

  const {title, id, todoListId} = props

  return (
    <div>
      {title}
    </div>
  );
};

export default Task;