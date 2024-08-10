import React, { useState } from "react";
import logo from "../img/logoLimpio.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass, faCartShopping,faX } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import PillTabs from "./MenuPlegable";
import { useAuth } from "./context/AuthContext";


const HeaderP = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const {loginSuccessful}=useAuth();
  const alternarMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  return (
    <header className="w-full flex justify-between items-center gap-10 pl-2 pr-2 border-b-2 border-[#F0F0F0] bg-white relative">
      
      <button onClick={alternarMenu}>
        <FontAwesomeIcon icon={menuAbierto ? faX : faBars} className="text-4xl" />
      </button>

      <button>
        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-4xl" />
      </button>
      <Link to="/">
        <a>
         <img className=" w-20 h-20" src={logo} alt="Logo" />
        </a>
      </Link>
      
      {loginSuccessful ? (
                <button>
                    <h1>holaaaaa</h1>
                </button>
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
      <nav className="flex flex-col fixed bg-white  top-0 left-0 w-full h-[100%] pl-0  z-50 ">
            <div className="bg-[#F0F0F0] flex justify-between items-center h-auto w-full pt-2 pb-2 pr-2 pl-2">
             
              <div className=" font-extralight text-base">

              <FontAwesomeIcon icon={faUser} className="text-1xl mr-2" />


              <a className="underline mr-2 " href="#ianiciar">iniciar sesion</a>
                o  
              <a className="ml-2 underline" href="#crear">crear cuenta</a>
              </div>
              <button  onClick={alternarMenu}>
                <FontAwesomeIcon icon={faX} className=" text-4xl" />
              </button>
             </div>
         
         
            
         <PillTabs/>
         
      </nav>
      )}
    </header>
  );
};

export default HeaderP;
