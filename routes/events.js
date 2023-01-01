/*
    * Rutas de Eventos
    * HOST + /api/events
*/
const { Router } = require('express');
const { check } = require('express-validator');

const {
    obtenerEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
} = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();
router.use(validarJWT);

//obtener eventos
router.get('/', obtenerEventos);

//crear evento
router.post('/', [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de finalización es obligatoria').custom(isDate),
    validarCampos
], crearEvento);

//actualizar evento
router.put('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de finalización es obligatoria').custom(isDate),
    validarCampos
], actualizarEvento);

//eliminar evento
router.delete('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    validarCampos
], eliminarEvento);


module.exports = router;