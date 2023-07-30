import React from 'react';

const Button = ({type, onClick, children, ...rest}) => {
  return (
    <button type={type} onClick={onClick} {...rest}>{children}</button>
  );
}

export default Button;
