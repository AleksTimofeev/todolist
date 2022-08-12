import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useState} from 'react';
import {useAppDispatch} from "../../Store/store";
import {addTodolist} from "../../Store/todolistsReducer";

type PropsType = {
  callbackOnEnter: () => void
}

const AddTodolist: React.FC<PropsType> = ({callbackOnEnter}) => {
  const dispatch = useAppDispatch()

  const [todolistTitle, setTodolistTitle] = useState<string>('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistTitle(e.currentTarget.value)
  }
  const handleOnKeyPress = (e: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
    if(e.key === 'Enter' && todolistTitle.length > 2){
      dispatch(addTodolist(todolistTitle))
      callbackOnEnter()
    }
  }

  return (
    <div>
      <input type={'text'} onChange={handleChange} onKeyPress={handleOnKeyPress} value={todolistTitle}/>
    </div>
  );
};

export default AddTodolist;