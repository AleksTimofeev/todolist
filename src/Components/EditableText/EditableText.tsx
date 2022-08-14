import React, {ChangeEvent, ReactChildren, ReactElement, useState} from 'react';

type PropsType = {
  value: string
  className?: string
  handleChangeText: (title: string) => void
}


const EditableText: React.FC<PropsType> = (props) => {

  const [editMode, setEditMode] = useState<boolean>(false)
  const [value, setValue] = useState<string>(props.value)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter'){
      props.handleChangeText(value)
      setEditMode(false)
    }
  }
  const handleDoubleClick = () => {
    setEditMode(true)
  }
  const handleBlur = () => {
    setEditMode(false)
    setValue(props.value)
  }


  return (
    <div className={props.className}>
      {editMode ?
        <input
          className={props.className}
          autoFocus
          value={value}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          onBlur={handleBlur}
        /> :
        <span onDoubleClick={handleDoubleClick}>{props.value}</span>
      }
    </div>
  );
};

export default EditableText;