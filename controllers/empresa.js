const {request, response} = require('express');
const Empresa = require('../models/empresa');
const tipoEmpresasA = require('../middlewares/validar-sucursales');
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/generar-jwt');

const getEmpresa = async(req = request, res = response) =>{
    const query = { estado: true };

    const listaEmpresa = await Promise.all([
        Empresa.countDocuments(query),
        Empresa.find(query).populate('sucursal', 'nombre')
    ]);

    res.json({
        msg: 'GET Usuario',
        listaEmpresa
    })
}

const postEmpresa = async(req = request, res = response) =>{
    const {nombre, correo, password, tipoEmpresa, sucursal} = req.body;
    const guardarEmpresa = new Empresa({nombre, correo, password, tipoEmpresa, sucursal});

    if(!tipoEmpresasA.tipoEmpresa.includes(guardarEmpresa.tipoEmpresa)){
        res.status(201).json({
            msg: `Ese tipo de empresa no es valido, los validos son: ${tipoEmpresasA.tipoEmpresa}`
        })
    }else{
        const salt = bcrypt.genSaltSync();
        guardarEmpresa.password = bcrypt.hashSync(password, salt);
    
        await guardarEmpresa.save();
    
        res.json({
            msg: 'POST Empresa',
            guardarEmpresa
        })
    }
}

const putEmpresa = async(req = request, res = response) =>{
    const idEmpresa = req.empresa._id
    const {_id, estado, ...resto} = req.body;
    if ( resto.password ) {
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(resto.password, salt);
    }

    if(!tipoEmpresasA.tipoEmpresa.includes(resto.tipoEmpresa)){
        res.status(201).json({
            msg:`Ese tipo de empresa no es valido, estos son los tipos de empresa validos: ${tipoEmpresasA.tipoEmpresa}` 
        })
    }else{
        const empresaGuardada = await Empresa.findByIdAndUpdate(idEmpresa, resto, {new: true});

        res.json({
            msg: 'PUT Empresa',
            empresaGuardada
        })
    }
}

const deleteEmpresa = async(req = request, res = response) =>{
    const idEmpresa = req.empresa._id
    const eliminarEmpresa = await Empresa.findByIdAndDelete(idEmpresa);
    res.json({
        msg: 'DELETE Empresa',
        eliminarEmpresa
    })
}

const loginEmpresa = async(req = request, res = response) =>{
    const { correo, password } = req.body;

    try {

        //Verficiar si el email existe
        const empresa = await Empresa.findOne({ correo });
        if ( !empresa ) {
            return res.status(400).json({
                msg: 'Correo / Password no son correctos - (El correo no existe)'
            });
        }

        //Si el usuario esta activo (estado = false)
        if ( !empresa.estado ) {
            return res.status(400).json({
                msg: 'Correo / Password no son correctos - estado: false'
            });
        }
        
        //Verificar la password
        const validarPassword = bcrypt.compareSync( password, empresa.password );
        if ( !validarPassword ) {
            return res.status(400).json({
                msg: 'Empresa / Password no son correctos - (password incorrecta)'
            });
        }

        //Generar JWT
        const token = await generarJWT( empresa.id );

        res.json({
            msg: 'Login PATH',
            correo, password,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador (BackEnd)'
        });
    }
}


module.exports = {
    getEmpresa,
    postEmpresa,
    putEmpresa,
    deleteEmpresa,
    loginEmpresa
}