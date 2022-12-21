import React from 'react';
import {TaskType} from "../../../API/api";
import EditableSpan from "../../EditableSpan/EditableSpan";

type PropsType = { data: TaskType }

export const TaskDescription: React.FC<PropsType> = ({data}) => {



  return (
    <div>
      <EditableSpan value={data.title} handleChangeText={() => {}} />
      {!!data.description &&  <EditableSpan value={data.description} handleChangeText={() => {}}/>}
      <span>{data.addedDate}</span>
    </div>
  );
}