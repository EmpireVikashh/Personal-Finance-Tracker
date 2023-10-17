import './style.css';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';


function Header() {
  const [user, loading] = useAuthState(auth);
  const navigate =  useNavigate();
  useEffect(() => {
    if(user){
      navigate("/dashboard");
    }
  
  }, [user,loading]);
  
  
  function LogoutFunc(){
    try{
      signOut(auth).then(() => {
        toast.success("Logout Successfully")
        navigate("/");
      }).catch((error) => {
        toast.error(error.message)
      });
    }
    catch(e){
      toast.error(e.message)
    }
  }

  return (
    <div className='navbar'>
      <p className='logo' >Finance Tracker.</p>
      {
        user && (
          <p className='link' onClick={LogoutFunc}>Logout</p>
        )
      }
    </div>
  )
}

export default Header