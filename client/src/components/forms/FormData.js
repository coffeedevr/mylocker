import React, { useState, useEffect } from 'react';
import Icon from '@mdi/react';
import { mdiAlertCircle } from '@mdi/js';

export default function FormData({data, onClose, onSubmit, title }) {

  const [ form, setForm ] = useState({
    label: data.label || "",
    username: data.username || "",
    password: data.password || ""
  });

  const [ errors, setError ] = useState({
    label: "",
    username: "",
    password: ""
  })

  function onChange(e) {
    setForm(prevState => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }


  function checkForm(e) {
    e.preventDefault()

    if (form.label.length < 3 || form.label.length > 64) {
      setError(prevState => ({
          ...prevState,
          label : "Your label must at least be between 3 and 64 characters."
        })
      )
    } else {
      setError(prevState => ({
        ...prevState,
        label : ""
        })
      )
    }

    if (form.username.length < 1) {
      setError((prevState => ({
        ...prevState,
        username: "Your username should not be blank."
        })
      ))

    } else {
      setError(prevState => ({
        ...prevState,
        username : ""
        })
      )
    }

    if (form.password.length < 1) {
      setError(prevState => ({
        ...prevState,
        password: "Your password should not be blank."
      }))

    } else {
      setError(prevState => ({
        ...prevState,
        password : ""
        })
      )
    }

    onSubmit(form)
  }

  return (
    <div className='edit-data'>
      <form className='form-edit-data' onSubmit={checkForm}>
        <h3>{title}</h3>
        <div className='user-inputs'>
          <label htmlFor='label'> Label:
            <input type="text" name='label' id='label' value={form.label ? form.label : ""} placeholder="ex: facebook, google" onChange={(e) => onChange(e)}/>
          </label>
          { errors.label.length > 0 ? <p className='errors'>{errors.label}</p> : "" }
        </div>
        <div className='user-inputs'>
          <label htmlFor='username'> Username:
            <input minLength='0' type="text" name='username' id='username' value={form.username ? form.username : ""} placeholder='ex: user@ex.com, example12' onChange={(e) => onChange(e)} />
          </label>
          { errors.username.length > 0 ? <p className='errors'><Icon path={mdiAlertCircle} size={1} color="light blue"/>{errors.username}</p> : "" }
        </div>
        <div className='user-inputs'>
          <label htmlFor='password'> Password:
            <input type="password" name='password' id='password' value={form.password ? form.password : ""} onChange={(e) => onChange(e)}/>
          </label>
          { errors.password.length > 0 ? <p className='errors'><Icon path={mdiAlertCircle} size={1} color="light blue"/>{errors.password}</p> : "" }
        </div>
        <div className='controls'>
          <button type="submit">Save</button>
          <button type="button" className='btn-close-form' onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  )
}
