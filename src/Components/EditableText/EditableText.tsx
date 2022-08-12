import React, {ChangeEvent, KeyboardEventHandler, useState} from 'react';

type PropsType = {
  value: string
  type: 'title' | 'text'
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

  const text = props.type === 'title' ? <h3 className={props.className}>{value}</h3> : <span className={props.className}>{value}</span>

  return (
    <>
      {editMode ?
        <input
          autoFocus
          value={value}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          onBlur={handleBlur}
        /> :
        <div onDoubleClick={handleDoubleClick}>{text}</div>
      }
    </>
  );
};

export default EditableText;