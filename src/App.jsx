import HeaderP from "./components/HeaderP"
import {BrowserRouter as  Router, Route,Routes  } from 'react-router-dom';
import Login from './components/Login/Login.jsx';
import Inicio from './components/Inicio.jsx';
import Registro from './components/Registro/Registro.jsx';
import Footer from "./components/Footer.jsx";
import AdminProductos from "./components/AdminProductos.jsx";
import { AuthProvider } from './components/context/AuthContext';
import ProtectedRoute from "./components/ProtectedRoute.jsx";
function App() {
  

  return (
   
    <Router>
    <AuthProvider>
      <div className="bg-[#EEEEEE]">
      <HeaderP/>
      <Routes>
       
        <Route path="/" element={<Inicio/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/registro" element={<Registro/>}/>
        <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminProductos />} />
            </Route>
            {/* Añade más rutas protegidas aquí */}
        
      </Routes>
      <Footer/>
      </div>
      </AuthProvider>
    </Router>
  )
}

export default App
