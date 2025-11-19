// el controller se encarga de recibir las peticiones, procesarlas y devolver una respuesta adecuada


const asesoriasService = require('./asesorias.service'); 
// Importa las funciones del servicio de asesorias, que interactúan con la base de datos

const list = async (req, res, next) => {
  try {
    const asesorias = await asesoriasService.getAll(); 
    // Llama al servicio para obtener todos los asesorias
    res.json(asesorias); 
    // Devuelve la lista de asesorias en formato JSON
  } catch (err) { next(err); } 
  // Si ocurre un error, lo pasa al middleware de manejo de errores
};

const getOne = async (req, res, next) => {
  try {
    const asesoria = await asesoriasService.getById(req.params.id); 
    // Llama al servicio para obtener un asesoria por su id
    if (!asesoria) return res.status(404).json({ message: 'asesoria no encontrada' }); 
    // Si no se encuentra el asesoria, responde con 404
    res.json(asesoria); 
    // Devuelve el asesoria encontrado
  } catch (err) { next(err); } 
  // Manejo de errores
};

const create = async (req, res, next) => {
  try {
    const nuevaAsesoria = await asesoriasService.createAsesoria(req.body);
    //oculta el password
    res.status(201).json(nuevaAsesoria); 
    // Devuelve el asesoria creado con código 201 (Created)
  } catch (err) { next(err); } 
  // Manejo de errores
};

const update = async (req, res, next) => {
  try {
    const asesoriaActualizado = await asesoriasService.updateAsesoria(req.params.id, req.body); 
    // Llama al servicio para actualizar un asesoria por id
    if (!asesoriaActualizado) return res.status(404).json({ message: 'Asesoria no encontrado' }); 
    // Si no se encuentra el asesoria, responde con 404
    res.json(asesoriaActualizado); 
    // Devuelve el asesoria actualizado
  } catch (err) { next(err); } 
  // Manejo de errores
};

const remove = async (req, res, next) => {
  try {
    const asesoriaEliminado = await asesoriasService.deleteAsesoria(req.params.id); 
    // Llama al servicio para eliminar un asesoria por id
    if (!asesoriaEliminado) return res.status(404).json({ message: 'Asesoria no encontrado' }); 
    // Si no existe, devuelve 404
    res.json({ message: 'asesoria eliminado correctamente' }); 
    // Devuelve mensaje de éxito
  } catch (err) { next(err); } 
  // Manejo de errores
};


// Consultas especificas
// ------------Estudiante-------------

// Crear una asesoria

const createAsesoriaByStudent = async (req, res, next) => {
  try {
    const { estudiante_id } = req.params;
    const {
      comentarios,
      tutor_id,
      espacio_id,
      fecha_asesoria,
      carrera_id
    } = req.body;

    const nuevaAsesoria = await asesoriasService.createAsesoriaByStudent(
      parseInt(estudiante_id, 10),
      {
        comentarios,
        tutor_id,
        espacio_id,
        fecha_asesoria,
        carrera_id
      }
    );

    res.status(201).json(nuevaAsesoria);
  } catch (err) {
    next(err);
  }
};

// Obtener asesorias por estudiante
const getAsesoriasByStudent = async (req, res, next) => {
  try {
    const estudiante_id = req.params.estudiante_id;
    const asesorias = await asesoriasService.getAsesoriasByStudent(estudiante_id);
    if (asesorias.length === 0) {
      return res.status(404).json({ message: 'No se encontraron asesorías para este estudiante' });
    }
    res.json(asesorias);
  } catch (err) { next(err); }
}

module.exports = { list, getOne, create, update, remove,
createAsesoriaByStudent, getAsesoriasByStudent
}; 
// Exporta todas las funciones del controlador para ser usadas en las rutas
