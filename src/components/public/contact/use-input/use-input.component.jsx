import React, { useState } from 'react'

const useInput = ({ type, name, label }) => {
  const [value, setValue] = useState('')
  const input = (
    <div className='form__group'>
      <input
        className='form__input'
        value={value}
        placeholder={label}
        onChange={(e) => setValue(e.target.value)}
        type={type}
      />
      <label htmlFor={name} className='form__label'>
        {label}
      </label>
    </div>
  )

  return [value, setValue, input]
}

export default useInput
