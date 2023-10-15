import "./SignupSigninComponent.css";
import React, { useState } from 'react'
import Input from '../Input/Input';
import Button from '../Button/Button';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function SignupSigninComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  function signupWithEmail(){
    setLoading(true);
    // console.log(name);
    // console.log(email);
    // console.log(Password);
    // console.log(confirmPassword);

    // Authencitcate the user , or basically create a new accout using email and password
    if(name.length!==""&&email.length!==""&&Password.length!==""&&confirmPassword.length!==""){

      if(Password===confirmPassword){
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
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage)
          console.log(errorMessage,errorCode);
          setLoading(false);
        });
      }else{
        toast.error("Password and Confirm Password should be same")
        setLoading(false)
      }

    
    }else{
      toast.error("All feilds are mandatory")
      setLoading(false)
    }

  }

  return (
 

    <div className='SignupSignin-wrapper'>
      <h2 className='title'>
        Signup on <span>Financely.</span>
      </h2>
      <form action="">
        {/* Imported Input */}
        <Input label={"Full Name"} state={name} setState={setName} placeholder={"Jhon leaki"} />
        <Input label={"Email"} state={email} setState={setEmail} placeholder={"Jhon@gmail.com"} />
        <Input label={"Password"} state={Password} setState={setPassword} placeholder={"123#abc"} type="Password" />
        <Input label={"Confirm Password"} state={confirmPassword} setState={setConfirmPassword} placeholder={"123#abc"} type="Password"/>
        <Button text="Signup Using Email and Password" onClick={signupWithEmail} />
        <p style={{textAlign:"center"}} >or</p>
        <Button text="Signup Using with Google" onClick={signupWithEmail} blue="true"/>
      </form>
    </div>
  )
}

export default SignupSigninComponent