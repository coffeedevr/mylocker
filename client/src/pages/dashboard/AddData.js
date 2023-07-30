import axios from 'axios';
import React from 'react';
import FormData from '../../components/forms/FormData';

export default function AddData({ onClose, fetchData, notify }) {

  function onSubmit(form) {
      axios.post('/api/v1/accounts/', {
        label: form.label,
        username: form.username,
        password: form.password,
        created_at: new Date(),
        last_modified: new Date()
      })
      .then(function (response) {
        notify('success', 'Account saved.')
        fetchData()
        onClose()
      })
      .catch(function (error) { 
        notify('error', 'Errors found.')
      })
  } 

  return (
    <div className='edit-data'>
      <FormData title="Save New Account" data={""} onClose={onClose} onSubmit={onSubmit} />
    </div>
  )
}
