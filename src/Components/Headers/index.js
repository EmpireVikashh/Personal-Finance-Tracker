import './style.css';

function Header() {

  function LogoutFunc(){
    alert("logout")
  }

  return (
    <div className='navbar'>
      <p className='logo' >Finance Tracker.</p>
      <p className='link' onClick={LogoutFunc}>Logout</p>
    </div>
  )
}

export default Header