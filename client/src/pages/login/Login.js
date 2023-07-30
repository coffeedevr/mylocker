import React from 'react';
import Input from '../../components/form_controls/Input';
import Button from '../../components/form_controls/Button';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function Signup() {
  return (
    <div className='user-landing'>
      <Header/>
      <form className="form user" action="" method="">
        <h2 className='form-title'>Login</h2>
        <Input type="text" name="username">Username</Input>
        <Input type="password" name="password">Password</Input>
        <Button type="submit">Log in</Button>
      </form>
      <Footer />
    </div>
  )
}
