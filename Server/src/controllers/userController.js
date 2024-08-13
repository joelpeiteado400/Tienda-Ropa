const getUsername = async (req, res) => {
    const email = req.params.email;
    // Lógica para obtener el nombre de usuario asociado con el email
    const username = await getUserUsernameFromDatabase(email);
    res.json({ username });
  };
  
  module.exports = { getUsername };