import React from 'react'

export const FormGroup = ({place, inputType,contLabel, nameInput, onChange }) => {
  return (
    <div className='form__group field'>
        <input onChange={onChange} name={nameInput} multiple className='form__field' placeholder={place} type={inputType} required />
        <label className='form__label'>{contLabel}</label>
    </div>
  )
}
