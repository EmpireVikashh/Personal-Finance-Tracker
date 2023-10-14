import React, { useState } from 'react'
import "./SignupSigninComponent.css";
import Input from '../Input/Input';
import Button from '../Button/Button';

function SignupSigninComponent() {
  const [name, setName] = useState();
  const [email, setemail] = useState();
  const [Password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  function click(){

  }

  return (
 

    <div className='SignupSignin-wrapper'>
      <h2 className='title'>
        Signup on <span>Financely.</span>
      </h2>
      <form action="">
        {/* Imported Input */}
        <Input label={"Full Name"} state={name} setState={setName} placeholder={"Jhon leaki"} />
        <Input label={"Email"} state={email} setState={setemail} placeholder={"Jhon@gmail.com"} />
        <Input label={"Password"} state={Password} setState={setPassword} placeholder={"123#abc"} />
        <Input label={"Confirm Password"} state={confirmPassword} setState={setConfirmPassword} placeholder={"123#abc"} />
        <Button text="Signup Using Email and Password" onClick={click} />
        <p style={{textAlign:"center"}} >or</p>
        <Button text="Signup Using with Google" onClick={click} blue="true"/>
      </form>
    </div>
  )
}

export default SignupSigninComponent