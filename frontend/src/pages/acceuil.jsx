import React from 'react'
import styles from '../style';
import "../css/acceuil.css";
import "../css/button.css";
import Leading from "../components/Leading"

function Acceuil() {
  return (
    <div className={`bg-background ${styles.flexStart} pt-20 slider`}>
      <div className={`${styles.boxWidth} z-[1100]`}>
        <Leading />
      </div>
    </div>
  )
}

export default Acceuil