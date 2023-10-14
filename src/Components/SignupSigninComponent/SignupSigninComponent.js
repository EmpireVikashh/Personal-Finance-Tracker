import React, { useState } from 'react'
import "./SignupSigninComponent.css";
import Input from '../Input/Input';

function SignupSigninComponent() {
  const [name, setName] = useState();
  const [email, setemail] = useState();
  const [Password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

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
      </form>
    </div>
  )
}

export default SignupSigninComponent