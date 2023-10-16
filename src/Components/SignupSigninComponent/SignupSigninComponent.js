import "./SignupSigninComponent.css";
import React, { useState } from 'react'
import Input from '../Input/Input';
import Button from '../Button/Button';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

function SignupSigninComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState("false");
  const [loginForm, setLoginForm] = useState(false)

  const navigate = useNavigate();

  function signupWithEmail() {
    setLoading(true);
    // Authencitcate the user , or basically create a new accout using email and password
    if (name !== "" && email !== "" && Password !== "" && confirmPassword !== "") {

      if (Password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, Password)
          .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log("user>>>", user);
            toast.success("User Created!")
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            createDoc(user);
            navigate("/dashboard");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage)
            console.log(errorMessage, errorCode);
            setLoading(false);
          });
      } else {
        toast.error("Password and Confirm Password should be same")
        setLoading(false)
      }

    } else {
      toast.error("All feilds are mandatory")
      setLoading(false)
    }
  }// Signup with email done here with this closing tag


  function loginUsingEmail(){
  setLoading(true)
  if (email !== "" && Password !== ""){
    signInWithEmailAndPassword(auth, email, Password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      toast.success("User logged in");
      setEmail("");
      setPassword("");
      console.log(user)
      setLoading(false)
      navigate("/dashboard");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage, errorCode);
      toast.error(errorMessage)
      setLoading(false)
    });
  }
  else{
    toast.error("All feilds are mandatory")
    setLoading(false)
    }  
  }


  function createDoc(user) {
    // make sure that the doc with the uid does'nt exist
    // Create the doc
  }

  return (
    <>
      {loginForm ? (
        <>
          <div className='SignupSignin-wrapper'>
            <h2 className='title'>
              Login on <span>Financely.</span>
            </h2>
            <form action="">
              {/* Imported Input */}
              <Input label={"Email"} state={email} setState={setEmail} placeholder={"example@xyz.com"} />
              <Input label={"Password"} state={Password} setState={setPassword} placeholder={"xyz123"} type="Password" />
              <Button text="Login Using Email and Password" loading={loading} onClick={loginUsingEmail} />
              <p style={{textAlign: "center"}} >or</p>
              <Button text="Login Using with Google" loading={loading} onClick={loginUsingEmail} blue="true" />
              <p className="p-login" onClick={()=>setLoginForm(!loginForm)} >Or Don't Have an Account? Click here</p>
            </form>
          </div>
        </>
      ) : (
        <div className='SignupSignin-wrapper'>
          <h2 className='title'>
            Signup on <span>Financely.</span>
          </h2>
          <form action="">
            {/* Imported Input */}
            <Input label={"Full Name"} state={name} setState={setName} placeholder={"Jhon leaki"} />
            <Input label={"Email"} state={email} setState={setEmail} placeholder={"Jhon@gmail.com"} />
            <Input label={"Password"} state={Password} setState={setPassword} placeholder={"123#abc"} type="Password" />
            <Input label={"Confirm Password"} state={confirmPassword} setState={setConfirmPassword} placeholder={"123#abc"} type="Password" />
            <Button text="Signup Using Email and Password" loading={loading} onClick={signupWithEmail} />
            <p  style={{textAlign: "center"}} >or</p>
            <Button text="Signup Using with Google" loading={loading} onClick={signupWithEmail} blue="true" />
            <p  className="p-login" onClick={()=>setLoginForm(!loginForm)} >Or Have an Account Already? Click here</p>
          </form>
        </div>
      )}

    </>
  )
}

export default SignupSigninComponent