import React, {useRef, useContext, useState} from "react";
import GlobalContext from "../../../context/GlobalContext";
import styles from './SignupForm.module.css';

const SignupForm = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const cnfpasswordRef = useRef();
  const {setWp} = props;

  const {signup, toastMessage} = useContext(GlobalContext);
  const [usernameValid , setUsernameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState(true);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const cnfpassword = cnfpasswordRef.current.value;
    const errors = {};
    
    if (!name) { 
        errors.username = "Invalid name";
        setUsernameValid(false); } else {setUsernameValid(true); }
    if (!email) {
        errors.email = "Invalid Email";
        setEmailValid(false); } else {setEmailValid(true); }
    if (!password) { errors.password = "Weak password";
        setPasswordValid(false); } else {setPasswordValid(true); }
    if (!cnfpassword) { errors.confirmpassword = "password doesn't match";
        setConfirmPassword(false); } 
    else if (password !== cnfpassword) { 
      // toastMessage("Passwords don't match", "warning");
          setConfirmPassword(false); } else {setConfirmPassword(true);

        }
    return errors;
    
};

  const validateSignup = async (e) => {
    const errors = validate();

    e.preventDefault();

    if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
    }
    else {
      handleSignup();
    }
  }

  const handleSignup = async (e)=>{
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const cnfpassword = cnfpasswordRef.current.value;

    
    if(password !== cnfpassword){
      toastMessage("Passwords don't match", "warning");
      return;
    }

    let res = await signup(name, email, password);
    if(res){
      setWp(true);
    }
  }
  return (
    <div className={styles.loginform}>
      <div className={styles.formitem}>
        <div className={styles.label}>Name</div>
        <input ref={nameRef} 
        type="text"
        placeholder={errors.username} 
        className={usernameValid ? styles.validinput: styles.invalidinput} />
      </div>
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
      <div className={styles.formitem}>
        <div className={styles.labelcnf}>Confirm Password</div>
        <input ref={cnfpasswordRef} 
        type="password" 
        placeholder={errors.confirmpassword} 
        className={confirmPassword ? styles.validinput: styles.invalidinput} />
      </div>
      <button onClick={validateSignup} className={styles.submit}>Sign Up</button>
    </div>
  );
};

export default SignupForm;
