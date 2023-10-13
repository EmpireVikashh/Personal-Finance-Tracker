import './App.css';
// import Header from './Components/Headers/Header';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
// import SignupSignin from './Components/SignupSignin/SignupSignin';
import Dashboard from './Pages/Dashboard';
import Signup from './Pages/Signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Signup/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;
