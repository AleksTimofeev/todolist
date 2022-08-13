import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useState} from 'react';
import {useAppDispatch} from "../../../Store/store";
import {addTask} from "../../../Store/taskReducer";

type PropsType = {
  idTodolist: string
}

const AddTask: React.FC<PropsType> = ({idTodolist}) => {

  const dispatch = useAppDispatch()

  const [showForm, setShowForm] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }
  const handleOnEnter = (e: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
    if(e.key === 'Enter' && value.length > 2){
      dispatch(addTask(idTodolist, value))
      setValue('')
      setShowForm(false)
    }
  }
  const handleBlur = () => {
    setValue('')
    setShowForm(false)
  }

  return (
    <div>
      {showForm ?
        <input
          autoFocus
          type={'text'}
          value={value}
          placeholder={'new task'}
          onChange={handleChange}
          onKeyPress={handleOnEnter}
          onBlur={handleBlur}
        /> :
        <button title={'add task'} onClick={() => setShowForm(true)}>+</button>
      }
    </div>
  );
};

export default AddTask;