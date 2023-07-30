import React from 'react'
import Copy from '../../assets/copy-alt.svg'
import Input from '../../components/form_controls/Input'
import { useState, useRef } from 'react';

export default function GeneratePass() {

  const [ pw, setPw ] = useState('');
  const [ form, setForm ] = useState({
    length: 8,
    options: {
      upp: true,
      low: true,
      num: true,
      sym: true
    }
  });

  const pw_input = useRef(null);

  function generatePass(form) {

    const pwOptions = {
      upp : "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      low : "abcdefghijklmnpqrstuvwxyz",
      num : "1234567890",
      sym : "!@#$%&'()*+,^-./:;<=>?[]_`{~}|"
    }

    let password = "";
    let allChars = "";
    
    if (form.options.upp === true) { 
      password += getRandomChar(pwOptions.upp)
      allChars += pwOptions.upp;
    };
    if (form.options.low === true) { 
      password += getRandomChar(pwOptions.low) 
      allChars += pwOptions.low;
    };
    if (form.options.num === true) { 
      password += getRandomChar(pwOptions.num)
      allChars += pwOptions.num; 
    };
    if (form.options.sym === true) { 
      password += getRandomChar(pwOptions.sym)
      allChars += pwOptions.sym; 
    };

    const remainingChar = form.length - password.length;
    const randomValues = new Uint32Array(remainingChar);
    window.crypto.getRandomValues(randomValues);

    for (let i = 0; i < randomValues.length; i++) {
      const randomIndex = randomValues[i] % allChars.length;
      password += allChars[randomIndex];
    }


    const toArr = password.split("");
    const shuffle = arr => {
      let a = arr.sort(() => Math.random() - 0.5)
      return a.join("");
    }
    
    setPw(shuffle(toArr));
  }

  function getRandomChar(chars) {
    const randomChar = Math.floor(Math.random() * chars.length)
    return chars[randomChar];
  }
  

  function onChange(event) {
    const { type, checked, name, value } = event.target;

    if (type === 'range') {
      setForm(prevState => ({
        ...prevState,
        length: [value]
      }))
    }

    if (type === 'checkbox') {
      if (checked === false) {
        setForm(prevState => ({
          ...prevState,
          options: {
            ...prevState.options,
            [name]: event.target.checked
          }
        }))
      } else {
        setForm(prevState => ({
          ...prevState,
          options: {
            ...prevState.options,
            [name]: event.target.checked
          }
        }))
      }
    }
  }

  function onSubmit(event) {
    event.preventDefault();

    if (form.options.low === false && form.options.num === false && form.options.sym === false && form.options.upp === false ) {
      alert("You must choose at least one of the options.")
    } else {
      generatePass(form);
    }
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(pw)
  }

  return (
    <div className="section-generator">
      <form className="form generate-pw" onSubmit={onSubmit}>
        <h3>Generate a Secure Password</h3>
        <p>You may customize the generated password<br/> with the following options below.</p>
        <div className='input-slider'>
          <p>Length: {form.length} characters</p>
          <input className='form-control' type='range' min='8' max='36' step='2' defaultValue='8' name='length' onChange={onChange} />
        </div>
        <div className='input-special'>
          <input id="pw-gen-input" className="form-control" type="text" ref={pw_input} value={pw} readOnly placeholder="Click 'generate' to create a password"
            style={{display: "flex", justifyItems: "center", background: "transparent", border: "none", cursor: "pointer", outline: "none", width: "400px", textAlign: "center"}}
          />
          <button type="button" className='btn gen-pw copy' onClick={copyToClipboard}>
            <img className="img icon copy" src={Copy} alt="" />
          </button>
        </div>
        <div className='input-options'>
          <Input type="checkbox" name="upp" value="uppercase" checked={form.options.upp} onChange={onChange}> uppercase</Input>
          <Input type="checkbox" name="low" value="lowercase" checked={form.options.low} onChange={onChange}> lowercase</Input>
          <Input type="checkbox" name="num" value="numbers" checked={form.options.num} onChange={onChange}> numbers</Input>
          <Input type="checkbox" name="sym" value="symbols" checked={form.options.sym} onChange={onChange}> symbols</Input>
        </div>
        <button type="submit" >Generate</button>
      </form>
    </div>
  )
}
