import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditData({data, onClose}) {

  const navigate = useNavigate();

  const { _id, website, username, password } = data;
  const [ form, setForm ] = useState({
    website: website,
    username: username,
    password: password,
  });

  function onChange(e) {
    const { name, value } = e.target
    setForm(prevState => ({
      ...prevState,
      [name] : value
    }))
  }

  function onSubmit(e) {
    e.preventDefault();
    axios.put('/api/v1/accounts/' + _id, {
      website: form.website,
      username: form.username,
      password: form.password,
      last_modified: new Date()
    })
    .then(
      alert("Saved account updated."),
      setTimeout(()=>{
        navigate("/dashboard/")
        window.location.reload(false);
      }, 500)
    )
    .catch(error => alert(error))
  }

  return (
      <form className='form-edit-data' onSubmit={onSubmit}>
        <h3>Edit Saved Account</h3>
        <div className='user-inputs'>
          <label htmlFor='website'> Website:
            <input type="text" name='website' id='website' defaultValue={website} onChange={onChange}/>
          </label>
        </div>
        <div className='user-inputs'>
          <label htmlFor='username'> Username:
            <input type="text" name='username' id='username' defaultValue={username} onChange={onChange}/>
          </label>
        </div>
        <div className='user-inputs'>
          <label htmlFor='password'> Password:
            <input type="password" name='password' id='password' defaultValue={password} onChange={onChange}/>
          </label>
        </div>
        <div className='controls'>
          <button type="submit">Save</button>
          <button type="button" className='btn-close-form' onClick={onClose}>Cancel</button>
        </div>
      </form>
  )
}
