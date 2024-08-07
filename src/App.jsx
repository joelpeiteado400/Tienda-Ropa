import HeaderP from "./components/HeaderP"
import { BrowserRouter as Router, Route,Routes  } from 'react-router-dom';
import Login from './components/Login/Login.jsx';
import Inicio from './components/Inicio.jsx';
import Footer from "./components/Footer.jsx";
function App() {
  

  return (
    <Router>
      <div>
      <HeaderP/>
      <Routes>
       
        <Route path="/" element={<Inicio/>}/>
        <Route path="/login" element={<Login/>}/>
        
      </Routes>
      <Footer/>
      </div>
    </Router>
  )
}

export default App
