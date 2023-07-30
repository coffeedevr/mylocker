import React, { useContext, useEffect } from 'react'
import GeneratePass from './GeneratePass';
import { PageContext } from '../../App';

export default function PasswordGenerator() {

  const { setPage } = useContext(PageContext)

  useEffect(() => {
    setPage(2)
  }, [])

  return (
    <div className='section gen-pw'>
      <h3>Password Generator</h3>
        <GeneratePass />
    </div> 
  )
}
