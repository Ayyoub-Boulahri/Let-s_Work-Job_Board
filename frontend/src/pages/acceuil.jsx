import React from 'react'
import styles from '../style';
import "../css/acceuil.css";
import "../css/button.css";
import Leading from "../components/Leading"
import About from '../components/About';
import Contact from '../components/Contact'

function Acceuil() {
  
  return (
    <div>
      <Leading />
      <About />
      <Contact />
    </div>
  )
}

export default Acceuil