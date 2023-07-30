import axios from 'axios';
import React from 'react';
import FormData from '../../components/forms/FormData';

export default function EditData({data, onClose, fetchData, notify}) {

  const { _id } = data;

  function onSubmit(form) {
      axios.put('/api/v1/accounts/' + _id, {
        label: form.label,
        username: form.username,
        password: form.password,
        created_at: new Date(),
        last_modified: new Date()
      })
      .then(function (response) {
        console.log(response)
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
      <FormData title="Edit Saved Account" data={data} onClose={onClose} onSubmit={onSubmit}/>
    </div>
  )
}
