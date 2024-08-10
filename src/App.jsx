import HeaderP from "./components/HeaderP"
import {BrowserRouter as  Router, Route,Routes  } from 'react-router-dom';
import Login from './components/Login/Login.jsx';
import Inicio from './components/Inicio.jsx';
import Footer from "./components/Footer.jsx";
import { AuthProvider } from './components/context/AuthContext';
function App() {
  

  return (
   
    <Router>
    <AuthProvider>
      <div>
      <HeaderP/>
      <Routes>
       
        <Route path="/" element={<Inicio/>}/>
        <Route path="/login" element={<Login/>}/>
        
      </Routes>
      <Footer/>
      </div>
      </AuthProvider>
    </Router>
  )
}

export default App
