const Materia = require('./materias.model');
const Carrera = require('../Carreras/carreras.model');

const getAll = async () => {
  return await Materia.findAll({
    order: [['nombre_materia', 'ASC']],
    where: { activo: true },
    include:[
        {
            model: Carrera,
            as: 'carrera',
            attributes: ['id_carrera', 'nombre_carrera']
        },
    ]
  });
}

const getById = async (id) => {
  return await Materia.findOne({
    where: { id_materia: id, activo: true },  // Asegura que se busque solo la materia activa
    include: [
      {
        model: Carrera,
        as: 'carrera',
        attributes: ['id_carrera', 'nombre_carrera']
      }
    ]
  });
};

const createMateria = async (data) => {
  return await Materia.create(data);
}

const updateMateria = async (id, data) => {
  const materia = await Materia.findByPk(id);
  if (!materia || !materia.activo) throw new Error('Materia not found');
  return await materia.update(data);
};


const deleteMateria = async (id) => {
  const materia = await Materia.findByPk(id);
  if (!materia || !materia.activo) throw new Error('Materia not found');
  await materia.update({ activo: false });
  return materia;
}


const getMateriasByCarreraId = async (carreraId) => {
  return await Materia.findAll({
    where: { carrera_id: carreraId, activo: true },
    order: [['nombre_materia', 'ASC']],
    include: [
      {
        model: Carrera,
        as: 'carrera',
        attributes: ['id_carrera', 'nombre_carrera']
      }
    ]
  });
}

module.exports = { getAll, getById, createMateria, updateMateria, deleteMateria, getMateriasByCarreraId };