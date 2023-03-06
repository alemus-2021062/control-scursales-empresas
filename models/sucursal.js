const {Schema, model} = require('mongoose');

const SchemaSucursal = Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es obligatorio'],
        unique: true
    },
    descripcion: {
        type: String,
    },
    municipio:{
        type: String,
        require: [true, 'El municipio es obligatorio'],
    },
    estado:{
        type: Boolean,
        default: true
    },
})

module.exports = model('Sucursal', SchemaSucursal);