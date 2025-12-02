// el controller se encarga de recibir las peticiones, procesarlas y devolver una respuesta adecuada


const usuariosService = require('./usuarios.service'); 
// Importa las funciones del servicio de usuarios, que interactúan con la base de datos

const list = async (req, res, next) => {
  try {
    const usuarios = await usuariosService.getAll(); 
    // Llama al servicio para obtener todos los usuarios
    res.json(usuarios); 
    // Devuelve la lista de usuarios en formato JSON
  } catch (err) { next(err); } 
  // Si ocurre un error, lo pasa al middleware de manejo de errores
};
const getOne = async (req, res, next) => {
  try {
    const usuario = await usuariosService.getById(req.params.id); 
    // Llama al servicio para obtener un usuario por su id
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' }); 
    // Si no se encuentra el usuario, responde con 404
    res.json(usuario); 
    // Devuelve el usuario encontrado
  } catch (err) { next(err); } 
  // Manejo de errores
};

const create = async (req, res, next) => {
  try {
    const nuevoUsuario = await usuariosService.createUsuario(req.body);
    //oculta el password
     const { password, ...safe } = nuevoUsuario.toJSON();
    // Llama al servicio para crear un nuevo usuario con los datos del body
    res.status(201).json(nuevoUsuario); 
    // Devuelve el usuario creado con código 201 (Created)
  } catch (err) { next(err); } 
  // Manejo de errores
};

const update = async (req, res, next) => {
  try {
    const usuarioActualizado = await usuariosService.updateUsuario(req.params.id, req.body); 
    // Llama al servicio para actualizar un usuario por id
    if (!usuarioActualizado) return res.status(404).json({ message: 'Usuario no encontrado' }); 
    // Si no se encuentra el usuario, responde con 404
    res.json(usuarioActualizado); 
    // Devuelve el usuario actualizado
  } catch (err) { next(err); } 
  // Manejo de errores
};

const remove = async (req, res, next) => {
  try {
    const usuarioEliminado = await usuariosService.deleteUsuario(req.params.id); 
    // Llama al servicio para eliminar un usuario por id
    if (!usuarioEliminado) return res.status(404).json({ message: 'Usuario no encontrado' }); 
    // Si no existe, devuelve 404
    res.json({ message: 'Usuario eliminado correctamente' }); 
    // Devuelve mensaje de éxito
  } catch (err) { next(err); } 
  // Manejo de errores
};

const getByRole = async (req, res, next) => {
  try {
    const usuarios = await usuariosService.getByRole(req.params.role);
    res.json(usuarios);
  } catch (err) { 
    next(err); 
  }
};

// Actualiza la exportación:
module.exports = { list, getOne, create, update, remove, getByRole };
