const { Router } = require('express');
const { check } = require('express-validator');
const { getEmpresa, postEmpresa, putEmpresa, deleteEmpresa, loginEmpresa } = require('../controllers/empresa');
const { emailExiste, nombreExiste } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.post('/login', [], loginEmpresa);

router.get('/mostrar',[
    validarJWT,
    validarCampos
], getEmpresa);

router.post('/agregar',[
    validarJWT,
    check('nombre').custom(nombreExiste),
    check('tipoEmpresa').toUpperCase(),
    check('correo', 'El correo es obligatorio').isEmail(),
    check('correo').custom(emailExiste),
    validarCampos
], postEmpresa);

router.put('/editar',[
    validarJWT,
    check('nombre').custom(nombreExiste),
    check('tipoEmpresa').toUpperCase(),
    check('correo', 'El correo es obligatorio').isEmail(),
    validarCampos
], putEmpresa);

router.delete('/eliminar',[
    validarJWT,

    validarCampos
], deleteEmpresa);

module.exports = router;