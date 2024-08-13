import axios from 'axios';

const fetchNombreUsuario = async (email) => {
  try {
    const response = await axios.get(`/api/username/${email}`, {
      headers: {
        'Content-Type': 'application/json',
        'email': email // Agregar el email en el header
      }
    });
    const username = response.data.username;
    return username;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default fetchNombreUsuario;