import React, {useRef, useContext, useState} from "react";
import styles from './LoginForm.module.css';
import GlobalContext from "../../../context/GlobalContext";
import {useNavigate} from "react-router-dom";

const LoginForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const {login, toastMessage} = useContext(GlobalContext);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const errors = {};
    
    if (!email) {
        errors.email = "Invalid Email";
        setEmailValid(false); } else {setEmailValid(true); }
    if (!password) { errors.password = "Invalid password";
        setPasswordValid(false); } else {setPasswordValid(true); }
        return errors;
    
};

  const validateLogin = async (e) => {
    const errors = validate();

    e.preventDefault();

    if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
    }
    else {
      handleLogin();
    }
  }

  const handleLogin = async (e)=>{
    if (!emailRef.current.value || !passwordRef.current.value) {
      toastMessage("Please enter all fields", "warning");
      return;
    }
    let res = await login(emailRef.current.value, passwordRef.current.value);
    if(res){
      navigate('/')
    }
  }
  return (
    <div className={styles.loginform}>
      <div className={styles.formitem}>
        <div className={styles.label}>Email</div>
        <input ref={emailRef} 
        type="text" 
        placeholder={errors.email} 
        className={emailValid ? styles.validinput: styles.invalidinput} />
      </div>
      <div className={styles.formitem}>
        <div className={styles.label}>Password</div>
        <input ref={passwordRef} 
        type="password" 
        placeholder={errors.password} 
        className={passwordValid ? styles.validinput: styles.invalidinput} />
      </div>
      <button onClick={validateLogin} className={styles.submit}>Log In</button>
    </div>
  );
};

export default LoginForm;
