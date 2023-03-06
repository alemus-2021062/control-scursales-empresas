const Empresa = require('../models/empresa');

//Este archivo maneja validaciones personalizadas
const emailExiste = async( correo = '' ) => {

    //Verificamos si el correo ya existe en la DB
    const existeEmail = await Empresa.findOne( { correo } );

    //Si existe (es true) lanzamos excepción
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo } ya existe y esta registrado en la DB`);
    }

}

const nombreExiste = async( nombre = '' ) => {

    //Verificamos si el correo ya existe en la DB
    const existeNombre = await Empresa.findOne( { nombre } );

    //Si existe (es true) lanzamos excepción
    if ( existeNombre ) {
        throw new Error(`El nombre: ${ nombre } ya existe y esta registrado en la DB`);
    }

}

const existeEmpresaPorId = async(id) => {
    //Verificar si el ID existe
    const existeEmpresa = await Empresa.findById(id);
    if ( !existeEmpresa ) {
        throw new Error(`El id ${ id } no existe en la DB`);
    }
}

const existeSucursalPorId = async(id) => {
    //Verificar si el ID existe
    const existeEmpresa = await Empresa.findById(id);
    if ( !existeEmpresa ) {
        throw new Error(`El id ${ id } no existe en la DB`);
    }
}




module.exports = {
    emailExiste,
    existeEmpresaPorId,
    existeSucursalPorId,
    nombreExiste
}