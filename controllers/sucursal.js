const {request, response} = require('express');
const Sucursal = require('../models/sucursal');
const municipios = require('../middlewares/validar-sucursales')

const getSucursal = async(req = request, res = response) =>{
    const query = { estado: true };

    const listaSucursal = await Promise.all([
        Sucursal.countDocuments(query),
        Sucursal.find(query)
    ]);

    res.json({
        msg: 'GET Sucursal',
        listaSucursal
    })
}

const postSucursal = async(req = request, res = response) =>{
    const {nombre, descripcion, municipio} = req.body;
    const guardarSucursal = new Sucursal({nombre, descripcion, municipio});
    
    if(!municipios.municipios.includes(guardarSucursal.municipio)){
        res.status(201).json({
            msg:`Ese municipio no es valido, estos son los municipios validos: ${municipios.municipios}` 
        })
    }else{
        await guardarSucursal.save();

        res.json({
            msg: 'POST Sucursal',
            guardarSucursal
        })
    }

}

const putSucursal = async(req = request, res = response) =>{
    const {id} = req.params;
    const {estado, _id, ...resto} = req.body;

    if(!municipios.municipios.includes(resto.municipio)){
        res.status(201).json({
            msg:`Ese municipio no es valido, estos son los municipios validos: ${municipios.municipios}` 
        })
    }else{

        const sucursalGuardada = await Sucursal.findByIdAndUpdate(id,resto, {new:true});

        res.json({
            msg: 'PUT Sucursales',
            sucursalGuardada
        })
    }
}

const deleteSucursal = async(req = request, res = response) =>{
    const {id} = req.params;
    const sucursalEliminada = await Sucursal.findByIdAndDelete(id);
    res.json({
        msg: 'DELETE Sucursal',
        sucursalEliminada
    })
}


module.exports = {
    getSucursal,
    postSucursal,
    putSucursal,
    deleteSucursal,
}