import React, { Component } from 'react';

const Input = ({type, name, children, value, onChange}) => {

  return (
    <div className="form-control-group">
      <label htmlFor={name}>{children}</label>
      <input type={type} name={name} defaultValue={value} onChange={onChange} autoComplete="on"/>
    </div>
  );
}

export default Input;
