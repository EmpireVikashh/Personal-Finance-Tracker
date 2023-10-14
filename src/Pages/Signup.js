import React from 'react'
import Header from '../Components/Headers'
import SignupSigninComponent from '../Components/SignupSignin'


function Signup() {
  return (
    <div>
        <Header/>
        <div className='wrapper'> 
              <SignupSigninComponent/>       
         </div>

    </div>
  )
}

export default Signup