const alumnoEspacioService = require("./alumnoEspacio.service");

const inscribir = async (req, res, next) => {
  try {
    const { alumnoId, espacioId } = req.params;

    const [registro, creado] = await alumnoEspacioService.inscribirAlumno(
      alumnoId,
      espacioId
    );

    res.status(201).json({
      message: creado
        ? "Alumno inscrito correctamente"
        : "El alumno ya estaba inscrito",
      registro
    });
  } catch (err) {
    next(err);
  }
};

const desinscribir = async (req, res, next) => {
  try {
    const { alumnoId, espacioId } = req.params;

    const eliminado = await alumnoEspacioService.desinscribirAlumno(
      alumnoId,
      espacioId
    );

    if (!eliminado)
      return res.status(404).json({ message: "El alumno no estaba inscrito" });

    res.json({ message: "Alumno desinscrito correctamente" });
  } catch (err) {
    next(err);
  }
};

const alumnosDeEspacio = async (req, res, next) => {
  try {
    const { espacioId } = req.params;
    const alumnos = await alumnoEspacioService.getAlumnosDeEspacio(espacioId);

    if (alumnos.length === 0)
      return res
        .status(404)
        .json({ message: "No hay alumnos inscritos en este espacio" });

    res.json(alumnos);
  } catch (err) {
    next(err);
  }
};

const espaciosDeAlumno = async (req, res, next) => {
  try {
    const { alumnoId } = req.params;
    const espacios = await alumnoEspacioService.getEspaciosDeAlumno(alumnoId);

    if (espacios.length === 0)
      return res.status(404).json({
        message: "El alumno no está inscrito en ningún espacio activo"
      });

    res.json(espacios);
  } catch (err) {
    next(err);
  }
};

const getEspaciosPorCarreraDeAlumno = async (req, res, next) => {
  try {
    const { alumnoId } = req.params;
    const espacios = await alumnoEspacioService.getEspaciosPorCarreraDeAlumno(alumnoId);

    res.json(espacios);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  inscribir,
  desinscribir,
  alumnosDeEspacio,
  espaciosDeAlumno,
  getEspaciosPorCarreraDeAlumno,
};
