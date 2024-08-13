import { Link } from "react-router-dom";
const Registro = () => {
    return(
        <div className="w-auto bg-white ml-6 mr-6 mt-6 mb-6 flex flex-col items-center">
            <h1 className="font-bold text-2xl mb-4 ml-4 mt-2">Cuenta Nueva</h1>
            <form className="border-b-2 border-[#F0F0F0] flex flex-col pl-4 pr-4 w-full" >
                <div className="flex flex-col items-center w-auto">

                    <div className="w-[80%] mb-4">
                    <label className="block font-semibold mb-2 text-black text-left">Email:</label>
                    <input 
                        className="w-full h-9 custom-input border-2 rounded-md border-gray-400"></input>
                    </div>

                    <div className="w-[80%] mb-4">
                    <label className="block font-semibold mb-2 text-black text-left">Nombre De Usuario:</label>
                    <input 
                        className="w-full h-9 custom-input border-2 rounded-md border-gray-400"></input>
                    </div>

                    <div className="w-[80%] mb-4">
                    <label className="block font-semibold mb-2 text-black text-left">Contraseña:</label>
                    <input 
                     className="w-full h-9 custom-input border-2 rounded-md border-gray-400"></input>
                    </div>

                    <div className="w-[80%] mb-4">
                    <label className="block font-semibold mb-2 text-black text-left">Confirmar Contraseña:</label>
                    <input 
                        className="w-full h-9 custom-input border-2 rounded-md border-gray-400"></input>
                    </div>
                    <label>
                       <input
                         type="checkbox"
                         className="mr-2"
                       />
                          Acepto los <a  href="/terms" target="_blank" rel="noopener noreferrer">términos y condiciones</a>
                     </label> 
                </div>
                
                <div className="flex justify-center mb-4">
                            <button className="rounded-full w-[50vh] h-12 ml-20 mr-20 p-2 mt-4 text-white bg-blue-500 font-semibold">Crear Cuenta</button>
                        </div>
                        <h1 className="flex  mb-2 justify-center">¿Ya tenes cuenta? <span className="underline ml-2"><Link to="/login">Iniciar Sesion</Link></span></h1>
            </form>
        </div>
    )
}

export default Registro;