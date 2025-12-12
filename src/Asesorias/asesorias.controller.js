// el controller se encarga de recibir las peticiones, procesarlas y devolver una respuesta adecuada

const { get } = require('./asesorias.routes');
const asesoriasService = require('./asesorias.service'); 
const Usuario = require("../Usuarios/usuarios.model");
// Importa las funciones del servicio de asesorias, que interactúan con la base de datos

const getAll = async (req, res, next) => {
  try {
    const asesorias = await asesoriasService.getAll();
    // Llama al servicio para obtener todos los asesorias
    res.json(asesorias);
    // Devuelve la lista de asesorias en formato JSON
  } catch (err) { next(err); }
  // Si ocurre un error, lo pasa al middleware de manejo de errores
}

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

// const create = async (req, res, next) => {
//   try {
//     const nuevaAsesoria = await asesoriasService.createAsesoria(req.body);
//     //oculta el password
//     res.status(201).json(nuevaAsesoria); 
//     // Devuelve el asesoria creado con código 201 (Created)
//   } catch (err) { next(err); } 
//   // Manejo de errores
// };

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


/*
Crear asesoria
Roles: student, coordinador
FPKs: estudiante_id, tutor_id, espacio_id, carrera_id, materia_id
Otros: comentarios, fecha_asesoria, asistencia (default false)
*/
const create = async (req, res, next) => {
  try {
    const { estudiante_id } = req.params;
    const {
      comentarios,
      tutor_id,
      espacio_id,
      fecha_asesoria,
      carrera_id
    } = req.body;

    const nuevaAsesoria = await asesoriasService.createAsesoria(
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


/*
Obtener asesorias por estudiante
Roles: student, tutor, coordinador
FPK: estudiante_id
*/
const getByStudent = async (req, res, next) => {
  try {
    const studentId = req.params.estudiante_id;
    const asesorias = await asesoriasService.getAsesoriasByStudent(studentId);
    if (asesorias.length === 0) {
      return res.status(404).json({ message: 'No se encontraron asesorías para este estudiante' });
    }
    res.json(asesorias);
  } catch (err) { next(err); }
}

/*
Obtener asesorias por tutor
Roles: tutor, coordinador
FPK: tutor_id
*/
const getByTutor = async (req, res, next) => {
  try {
    const tutorId = req.params.tutor_id;
    const asesorias = await asesoriasService.getAsesoriasByTutor(tutorId);
    if (asesorias.length === 0) {
      return res.status(404).json({ message: 'No se encontraron asesorías para este tutor' });
    }
    res.json(asesorias);
  } catch (err) { next(err); }
}

/*
Obtener asesorias por materia
Roles: tutor, coordinador
FPK: materia_id
*/
const getByMateria = async (req, res, next) => {
  try {
    const materiaId = req.params.materia_id;
    const asesorias = await asesoriasService.getAsesoriasByMateria(materiaId);
    if (asesorias.length === 0) {
      return res.status(404).json({ message: 'No se encontraron asesorías para esta materia' });
    }
    res.json(asesorias);
  } catch (err) { next(err); }
}

/*
Obtener asesorias por carrera
Roles: tutor, coordinador
FPK: carrera_id
*/
const getByCarrera = async (req, res, next) => {
  try {
    const carreraId = req.params.carrera_id;
    const asesorias = await asesoriasService.getAsesoriasByCarrera(carreraId);
    if (asesorias.length === 0) {
      return res.status(404).json({ message: 'No se encontraron asesorías para esta carrera' });
    }
    res.json(asesorias);
  } catch (err) { next(err); }
}

/*
Obtener asesorias por espacio
Roles: student, tutor, coordinador
FPK: espacio_id
*/
const getByEspacio = async (req, res, next) => {
  try {
    const espacioId = req.params.espacio_id;
    const asesorias = await asesoriasService.getAsesoriasByEspacio(espacioId);
    if (asesorias.length === 0) {
      return res.status(404).json({ message: 'No se encontraron asesorías para este espacio' });
    }
    res.json(asesorias);
  } catch (err) { next(err); }
}

/*
Aceptar o rechazar asesoria
Roles: tutor, coordinador
Parametros: id (path) - id de la asesoria
Body: { aceptada: boolean } - true para aceptar, false para rechazar
*/
const { sendConfirmationEmail } = require("./asesorias.service");

const updateStatus = async (req, res, next) => {
  console.log("Entrando a updateStatus");
  try {
    console.log("Parametros recibidos:", req.params);
    const asesoriaId = req.params.id;
    const { aceptada } = req.body || {};

    if (aceptada === undefined || typeof aceptada !== 'boolean') {
      return res.status(400).json({ message: 'El parámetro aceptada es requerido y debe ser un booleano (true o false)' });
    }

    const asesoriaActualizada = await asesoriasService.updateAsesoriaStatus(asesoriaId, aceptada);
    console.log(asesoriaActualizada , "Asesoría actualizada");
    if (!asesoriaActualizada) {
      return res.status(404).json({ message: 'Asesoría no encontrada' });
    }
  
    if (aceptada) {
      console.log("Enviando correo de confirmación",aceptada);
     console.log(asesoriaActualizada.dataValues.estudiante_id, "ID Estudiante");
      const alumno = await Usuario.findByPk(asesoriaActualizada.dataValues.estudiante_id);
       console.log(alumno)
      await sendConfirmationEmail(alumno.email, alumno.nombre, asesoriaActualizada.fecha_asesoria);
    }

    const mensaje = aceptada ? 'Asesoría aceptada correctamente' : 'Asesoría rechazada correctamente';
    res.json({ message: mensaje, asesoria: asesoriaActualizada });
  } catch (err) { next(err); }
}

/*
Marcar asistencia de asesoria
Roles: tutor, coordinador
Parametros: id (path) - id de la asesoria
Body: { asistencia: boolean } - true si asistió, false si no asistió
*/
const markAttendance = async (req, res, next) => {
  try {
    const asesoriaId = req.params.id;
    const { asistencia } = req.body || {};

    if (asistencia === undefined || typeof asistencia !== 'boolean') {
      return res.status(400).json({ message: 'El parámetro asistencia es requerido y debe ser un booleano (true o false)' });
    }

    const asesoriaActualizada = await asesoriasService.updateAsistencia(asesoriaId, asistencia);
    if (!asesoriaActualizada) {
      return res.status(404).json({ message: 'Asesoría no encontrada' });
    }

    const mensaje = asistencia ? 'Asistencia marcada como presente' : 'Asistencia marcada como ausente';
    res.json({ message: mensaje, asesoria: asesoriaActualizada });
  } catch (err) { next(err); }
}

module.exports = { list, getOne, create, update, remove,
getByStudent, getByTutor, getByMateria, getByCarrera, getByEspacio, getAll, updateStatus, markAttendance
}; 
// Exporta todas las funciones del controlador para ser usadas en las rutas
