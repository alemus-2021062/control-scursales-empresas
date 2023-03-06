const { Router } = require('express');
const { check } = require('express-validator');
const { getSucursal, postSucursal, putSucursal, deleteSucursal, buscarSucursal } = require('../controllers/sucursal');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT} = require('../middlewares/validar-jwt');
const { nombreExiste } = require('../helpers/db-validators');

const router = Router();

router.get('/mostrar',[
    validarJWT,
    validarCampos
], getSucursal);

router.post('/agregar',[
    validarJWT,
    check('nombre').custom(nombreExiste),
    check('municipio').toUpperCase(),
    validarCampos
], postSucursal);

router.put('/editar/:id',[
    validarJWT,
    check('nombre').custom(nombreExiste),
    check('id').isMongoId(),
    check('municipio').toUpperCase(),
    validarCampos
], putSucursal);

router.delete('/eliminar/:id',[
    validarJWT,
    check('id').isMongoId(),
    validarCampos
], deleteSucursal);


module.exports = router;