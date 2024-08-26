import React, { useState, useEffect } from "react";
import logo from "../img/logoLimpio.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass, faCartShopping, faX } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import PillTabs from "./MenuPlegable";
import { useAuth } from "./context/AuthContext";


const HeaderP = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { loginSuccessful, nombreUsuario, logOut ,rol } = useAuth(); 
  const [miniMenuAbierto, setMiniMenuAbierto] = useState(false);
  const navigate = useNavigate();
  
  const alternarMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const alternarMiniMenu = () => {
    if (loginSuccessful) {
      setMiniMenuAbierto(!miniMenuAbierto);
    }
  };
  const irAAdmin = () => {
    setMiniMenuAbierto(false); 
    navigate('/admin'); 
  }
 
 
    
   

  return (
    <header className="w-full flex justify-between items-center gap-10 pl-2 pr-2 border-b-2 border-[#F0F0F0] bg-white relative">
      
      <button onClick={alternarMenu}>
        <FontAwesomeIcon icon={menuAbierto ? faX : faBars} className="text-4xl" />
      </button>

      <button>
        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-4xl" />
      </button>
      <Link to="/">
        <img className="w-20 h-20" src={logo} alt="Logo" />
      </Link>
      
      {loginSuccessful ? (
        <div className="relative">
          <button onClick={alternarMiniMenu} className="w-auto font-bold">
            <FontAwesomeIcon icon={faUser} className="text-3xl" /> <br />{nombreUsuario}
          </button>
          {miniMenuAbierto && (
            <div className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded-lg shadow-lg">
              {rol === 'admin' &&(
                
                <button onClick={irAAdmin} className="font-semibold block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
                  Admin
                </button>
                
              )}
              <button onClick={logOut} className="font-semibold block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link to="/login">
          <button>
            <FontAwesomeIcon icon={faUser} className="text-4xl" />
          </button>
        </Link>
      )}
      
      
      <button>
        <FontAwesomeIcon icon={faCartShopping} className="text-4xl" />
      </button>

      {menuAbierto && (
         <nav className="flex flex-col fixed bg-white top-0 left-0 w-full h-[100%] pl-0 z-50">
          <div className="bg-[#F0F0F0] flex justify-between items-center h-auto w-full pt-2 pb-2 pr-2 pl-2">
           <div className="font-extralight text-base">
             <FontAwesomeIcon icon={faUser} className="text-1xl mr-2" />
              {loginSuccessful ? (
               <span className="text-1xl font-semibold">Bienvenido(a) de vuelta, {nombreUsuario}</span>
            ) : (
              <>
              <Link to="/login" onClick={alternarMenu}>
                <button className="underline mr-2" href="#iniciar">iniciar sesión</button>
              </Link>
                 o
                 <Link to="/registro" onClick={alternarMenu}> 
                 <button className="ml-2 underline" href="#crear">crear cuenta</button>
                 </Link>
              </>
             )}
           </div>
            <button onClick={alternarMenu}>
              <FontAwesomeIcon icon={faX} className="text-4xl" />
            </button>
          </div>
          <PillTabs />
        </nav>
      )}
    </header>
  );
};

export default HeaderP;

