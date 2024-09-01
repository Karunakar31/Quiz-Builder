import React, { useState, useContext, useEffect } from 'react'
import styles from "./Auth.module.css"
import LoginForm from '../../components/auth/LoginForm/LoginForm'
import SignupForm from '../../components/auth/SignupForm/SignupForm'
import {useNavigate} from 'react-router-dom'
import GlobalContext from '../../context/GlobalContext'


const Auth = () => {

  const [wp, setWp] = useState(true);
  const {isAuthenticated} = useContext(GlobalContext);

  const showSignup = ()=>{
    setWp(false)
  }

  const showLogin = ()=>{
    setWp(true);
  }

  const navigate = useNavigate();

  useEffect(() => {
      if(isAuthenticated){
          navigate('/')
      }
  }, [isAuthenticated])

  return (
    <>
      <div className={styles.authbox}>
            <h1 className={styles.title}>QUIZZIE</h1>
            <div className={styles.authtabs}>
                <div onClick={showSignup} className={`${styles.authbutton} ${!wp&& styles.selected}`}>
                  Sign Up
                </div>
                <div onClick={showLogin} className={`${styles.authbutton} ${wp&& styles.selected}`}>
                  Log In
                </div>
            </div>
            <div className={styles.authcontainer}>
                {
                  wp ?  <LoginForm /> : <SignupForm setWp={setWp} />
                }
            </div>
      </div>
    </>
  )
}

export default Auth