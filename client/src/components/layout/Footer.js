import React from "react"
import '../../styles/footer.scss'
import Icon from '@mdi/react';
import { mdiGithub } from '@mdi/js';

const Footer = () => {
  const footerText = '© ' + new Date().getFullYear() + ' coffeedevr | '

  return <footer>
    <p id="footer-text">{footerText}</p>
    <a href="https://github.com/coffeedevr/locker-app">
      <Icon path={mdiGithub} size={1.2} color={"white"} /> 
    </a>
  </footer>
}

export default Footer