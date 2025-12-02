const TutorMateria = require('./tutorMaterias.model');
const Usuario = require('../Usuarios/usuarios.model');
const Materia = require('../Materias/materias.model');


// Asignar materia a tutor
const asignarMateria = async (tutorId, materiaId) => {

  // Validar rol del tutor
  const tutor = await Usuario.findByPk(tutorId);
  if (!tutor) throw new Error("El tutor no existe");
  if (tutor.role !== 'tutor') throw new Error("El usuario no tiene rol 'tutor'");

  // Validar materia
  const materia = await Materia.findByPk(materiaId);
  if (!materia) throw new Error("La materia no existe");

  // Verificar si ya está asignada
  const existe = await TutorMateria.findOne({
    where: { usuario_id: tutorId, materia_id: materiaId }
  });

  if (existe) return { message: "La materia ya está asignada al tutor" };

  return await TutorMateria.create({
    usuario_id: tutorId,
    materia_id: materiaId
  });
};


// Quitar materia a tutor
const quitarMateria = async (tutorId, materiaId) => {
  const registro = await TutorMateria.findOne({
    where: { usuario_id: tutorId, materia_id: materiaId }
  });

  if (!registro) throw new Error("El tutor no imparte esta materia");

  await registro.destroy();

  return { message: "Materia removida correctamente" };
};


// Listar materias impartidas por un tutor
const obtenerMateriasDeTutor = async (tutorId) => {
  return await Usuario.findByPk(tutorId, {
    attributes: ['id_usuario', 'nombre', 'apellido'],
    include: [
      {
        model: Materia,
        as: 'materias_impartidas',
        attributes: ['id_materia', 'nombre_materia', 'activo']
      }
    ]
  });
};


// Listar tutores que imparten una materia
const obtenerTutoresDeMateria = async (materiaId) => {
  return await Materia.findByPk(materiaId, {
    attributes: ['id_materia', 'nombre_materia'],
    include: [
      {
        model: Usuario,
        as: 'tutores',
        attributes: ['id_usuario', 'nombre', 'apellido', 'email', 'role']
      }
    ]
  });
};


module.exports = {
  asignarMateria,
  quitarMateria,
  obtenerMateriasDeTutor,
  obtenerTutoresDeMateria
};
