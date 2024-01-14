import React, { useEffect } from 'react'
import styles from '../style';
import "../css/acceuil.css";
import "../css/button.css";
import Leading from "../components/Leading"
import About from '../components/About';
import Contact from '../components/Contact'
import handleLogout from '../services/handleLogout';
import { useDispatch } from 'react-redux';
import { setLoginOut } from '../stores/authStore';
function Acceuil() {
  const dispatch = useDispatch()

  useEffect(() => {
    handleLogout();
    dispatch(setLoginOut());
  }, [])

  return (
    <div>
      <Leading />
      <About />
      <Contact />
    </div>
  )
}

export default Acceuil