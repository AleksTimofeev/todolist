import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useState} from 'react';
import {useAppDispatch} from "../../Store/store";

type PropsType = {
  callbackAddItem: (title: string) => void
}

const AddItem: React.FC<PropsType> = ({callbackAddItem}) => {

  const dispatch = useAppDispatch()

  const [showForm, setShowForm] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }
  const handleOnEnter = (e: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
    if(e.key === 'Enter' && value.length > 2){
      callbackAddItem(value)
      setValue('')
      setShowForm(false)
    }
  }
  const handleBlur = () => {
    setValue('')
    // setShowForm(false)
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
        <button title={'add'} onClick={() => setShowForm(true)}>+</button>
      }
    </div>
  );
};

export default AddItem;