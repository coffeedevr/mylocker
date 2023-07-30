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
        <h2 className='form-title'>Sign Up</h2>
        <Input type="text" name="username">Username</Input>
        <Input type="email" name="email">Email Address</Input>
        <Input type="password" name="password">Password</Input>
        <Input type="password" name="confirmpw">Confirm Password</Input>
        <Button type="submit">Sign Up</Button>
      </form>
      <Footer />
    </div>
  )
}
