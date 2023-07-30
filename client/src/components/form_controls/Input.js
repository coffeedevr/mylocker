import React, { Component } from 'react';

const Input = ({type, name, children, value, onChange, checked}) => {

  if (type == 'text' || type == 'password' || type == 'email') {
  return (
    <input className="form-control" type={type} name={name} onChange={onChange} autoComplete='on' placeholder={children} />
    )
  }

  if (type == 'checkbox') {
    return (
      <label>
        <input className="form-control" type={type} name={name} value={value} onChange={onChange} defaultChecked={checked}/> {children}
      </label>
    )
  }
}

export default Input;
