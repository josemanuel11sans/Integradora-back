const Asesoria = require('./asesorias.model'); 

// Modelos que tienen relacion con asesorias
const Carrera = require('../Carreras/carreras.model');
const Usuario = require('../Usuarios/usuarios.model');
// Importa el modelo Asesoria

const getAll = async () => {
  return await Asesoria.findAll({
    where: { activo: true },
    include: [
      {
        model: Carrera,
        as: 'carrera',
        attributes: ['id_carrera', 'nombre_carrera']
      },
      {
        model: Usuario,
        as: 'tutor',
        attributes: ['id_usuario', 'nombre', 'apellido', 'email']
      }
    ],
    order: [['fecha_asesoria', 'DESC']]
  });
};

const getById = async (id) => {
  return await Asesoria.findByPk(id); 
  // Busca un Asesoria por su primary key
};

// const createAsesoria = async (data) => {
//   return await Asesoria.create(data); 
//   // Crea un nuevo Asesoria con los datos proporcionados
// };

const updateAsesoria = async (id, data) => {
  const Asesoria = await Asesoria.findByPk(id); 
  // Busca el Asesoria a actualizar
  if (!Asesoria) return null; 
  // Si no existe, devuelve null
  return await Asesoria.update(data); 
  // Actualiza el Asesoria con los datos proporcionados
};

const deleteAsesoria = async (id) => {
  const Asesoria = await Asesoria.findByPk(id); 
  // Busca el Asesoria a eliminar
  if (!Asesoria) return null; 
  // Si no existe, devuelve null
  await Asesoria.destroy(); 
  // Elimina el Asesoria
  return Asesoria; 
  // Devuelve el Asesoria eliminado
};


// Consultas especificas

/*
Crear asesoria
Roles: student, coordinador
FPKs: estudiante_id, tutor_id, espacio_id, carrera_id, materia_id
Otros: comentarios, fecha_asesoria, asistencia (default false)
*/
const createAsesoria = async (studentId, data) => {
  return await Asesoria.create({
    ...data,                 // comentarios, tutor_id, espacio_id, fecha_asesoria, carrera_id
    estudiante_id: studentId,           // forzamos que el id venga del params
    asistencia: false        // siempre false al crear
  });
};


/*
Obtener asesorias por estudiante
Roles: student, tutor, coordinador
FPK: estudiante_id
*/
const getAsesoriasByStudent = async (studentId) => {
  return await Asesoria.findAll({
    where: { estudiante_id: studentId },
    include: [
      {
        model: Usuario,
        as: 'estudiante',
        attributes: ['id_usuario', 'nombre', 'apellido', 'email']
      },
      {
        model: Usuario,
        as: 'tutor',
        attributes: ['id_usuario', 'nombre', 'apellido', 'email']
      },
      {
        model: Carrera,
        as: 'carrera',
        attributes: ['id_carrera', 'nombre_carrera']
      }
    ],
    order: [['fecha_asesoria', 'DESC']]
  });
};


/*
Obtener asesorias por tutor
Roles: tutor, coordinador
FPK: tutor_id
*/
const getAsesoriasByTutor = async (tutorId) => {
  return await Asesoria.findAll({
    where: { tutor_id: tutorId },
    include: [
      {
        model: Usuario,
        as: 'tutor',
        attributes: ['id_usuario', 'nombre', 'apellido', 'email']
      },
      {
        model: Carrera,
        as: 'carrera',
        attributes: ['id_carrera', 'nombre_carrera']
      }
    ],
    order: [['fecha_asesoria', 'DESC']]
  });
};

/*
Obtener asesorias por materia
Roles: tutor, coordinador
FPK: materia_id
*/
const getAsesoriasByMateria = async (materiaId) => {
  return await Asesoria.findAll({
    where: { materia_id: materiaId },
    order: [['fecha_asesoria', 'DESC']]
  });
};

/*
Obtener asesorias por carrera
Roles: tutor, coordinador
FPK: carrera_id
*/
const getAsesoriasByCarrera = async (carreraId) => {
  return await Asesoria.findAll({
    where: { carrera_id: carreraId },
    include: [
      {
        model: Carrera,
        as: 'carrera',
        attributes: ['id_carrera', 'nombre_carrera']
      }
    ],
    order: [['fecha_asesoria', 'DESC']]
  });
}

/*
Obtener asesorias por espacio
Roles: student, tutor, coordinador
FPK: espacio_id
*/
const getAsesoriasByEspacio = async (espacioId) => {
  return await Asesoria.findAll({
    where: { espacio_id: espacioId },
    include: [
      {
        model: Usuario,
        as: 'estudiante',
        attributes: ['id_usuario', 'nombre', 'apellido', 'email']
      },
      {
        model: Usuario,
        as: 'tutor',
        attributes: ['id_usuario', 'nombre', 'apellido', 'email']
      },
      {
        model: Carrera,
        as: 'carrera',
        attributes: ['id_carrera', 'nombre_carrera']
      }
    ],
    order: [['fecha_asesoria', 'DESC']]
  });
}

/*
Aceptar o rechazar asesoria
Roles: tutor, coordinador
FPK: id_asesoria
Parametro: aceptada (boolean) - true para aceptar, false para rechazar
*/
const updateAsesoriaStatus = async (asesoriaId, aceptada) => {
  const asesoria = await Asesoria.findByPk(asesoriaId);
  if (!asesoria) return null;
  return await asesoria.update({ activo: aceptada });
};

/*
Marcar asistencia de asesoria
Roles: tutor, coordinador
FPK: id_asesoria
Parametro: asistencia (boolean) - true si asistió, false si no asistió
*/
const updateAsistencia = async (asesoriaId, asistencia) => {
  const asesoria = await Asesoria.findByPk(asesoriaId);
  if (!asesoria) return null;
  return await asesoria.update({ asistencia: asistencia });
};


module.exports = { getAll, getById, createAsesoria, updateAsesoria, deleteAsesoria,
getAsesoriasByStudent, getAsesoriasByTutor, getAsesoriasByMateria,
getAsesoriasByCarrera, getAsesoriasByEspacio, updateAsesoriaStatus, updateAsistencia,
}; 
// Exporta todas las funciones del servicio
