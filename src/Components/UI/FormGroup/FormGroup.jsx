import React from 'react'

export const FormGroup = ({place, inputType,contLabel, nameInput, onChange, value, min, defaultValue}) => {
  return (
    <div className='form__group field'>
        <input min={min} defaultValue={defaultValue} contentEditable="true" value={value} onChange={onChange} name={nameInput} multiple className='form__field' placeholder={place} type={inputType} required />
        <label className='form__label'>{contLabel}</label>
    </div>
  )
}
