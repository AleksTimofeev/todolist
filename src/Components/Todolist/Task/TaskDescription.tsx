import React from 'react';
import {TaskType} from "../../../API/api";
import EditableText from "../../EditableText/EditableText";

type PropsType = { data: TaskType }

const TaskDescription: React.FC<PropsType> = ({data}) => {



  return (
    <div>
      <EditableText value={data.title} handleChangeText={() => {}} />
      {!!data.description &&  <EditableText value={data.description} handleChangeText={() => {}}/>}
      <span>{data.addedDate}</span>
    </div>
  );
};

export default TaskDescription;