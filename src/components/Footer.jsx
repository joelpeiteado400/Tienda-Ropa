import Logo from "../img/logoLimpio.png"
import { Link } from "react-router-dom";
const Footer = () =>{
    return(
        <div className="grid place-items-center  grid-cols-1 w-full h-auto bg-[#EEEEEE]">
            <Link to="/">
               
                <img className=" w-40"src={Logo} alt="Logo"></img>
              
            </Link>
            <h1>Footer</h1>
        </div>
    )
}

export default Footer;