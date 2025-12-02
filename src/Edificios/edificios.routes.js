const express = require('express');
const router = express.Router();
const edificiosController = require('./edificios.controller');
const authenticate = require('../auth/middlewares/authenticate');
const authorizeRoles = require('../auth/middlewares/authorizeRoles');

// Obtener todos los edificios
router.get('/', edificiosController.list);

// Obtener un edificio por ID
router.get('/:id', edificiosController.getOne);

// Crear nuevo edificio (requiere autenticación y rol de admin)
router.post('/create', 
  authenticate, 
  authorizeRoles('admin', 'coordinator'),
  edificiosController.create
);

// Actualizar edificio
router.put('/:id', 
  authenticate, 
  authorizeRoles('admin', 'coordinator'),
  edificiosController.update
);

// Eliminar edificio (eliminación física)
router.delete('/:id', 
  authenticate, 
  authorizeRoles('admin'),
  edificiosController.remove
);

// Desactivar edificio (cambiar estado)
router.patch('/:id/deactivate', 
  authenticate, 
  authorizeRoles('admin', 'coordinator'),
  edificiosController.deactivate
);

// Obtener aulas por edificio
router.get('/:id/aulas', edificiosController.getAulasByEdificio);

// Rutas de prueba (OPCIONAL - puedes eliminar si no las necesitas)
router.get('/test-auth', authenticate, (req, res) => {
  res.json({
    message: 'Autenticación exitosa',
    user: req.user,
    timestamp: new Date().toISOString()
  });
});

router.get('/test-role', authenticate, authorizeRoles('admin'), (req, res) => {
  res.json({
    message: 'Autorización exitosa',
    user: req.user,
    authorized: true
  });
});

// ⚠️ REMOVER: Esta ruta está DUPLICADA (líneas 11-15 ya definen la ruta /create)
// router.post('/create', 
//   authenticate, 
//   authorizeRoles('admin', 'coordinador'),
//   edificiosController.create
// );

module.exports = router;