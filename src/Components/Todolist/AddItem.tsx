import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useState} from 'react';
import {Button} from "@mui/material";

type PropsType = {
  title?: string
  callbackAddItem: (title: string) => void
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
}

const AddItem: React.FC<PropsType> = ({callbackAddItem, title, size, disabled}) => {

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
        /> :<>
          <Button variant={'outlined'}
                  size={size ? size : 'medium'}
                  onClick={() => setShowForm(true)}
                  disabled={disabled}
          >
            {title}
          </Button>
        </>
      }
    </div>
  );
};

export default AddItem;