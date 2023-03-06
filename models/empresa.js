const {Schema, model} = require('mongoose');

const SchemaEmpresa = Schema({
    nombre:{
        type: String,
        require:[true, 'El nombre es obligatorio'],
        unique:true
    },
    correo:{
        type: String,
        require:[true, 'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        require: [true, 'La password es obligatoria']
    },
    tipoEmpresa:{
        type: String,
        require: [true, 'El tipo de empresa es obligatoria']
    },
    sucursal:[{
        type: Schema.Types.ObjectId,
        ref: 'Sucursal',
        require: [true, 'Al menos una sucursal es obligatoria']
    }],
    estado:{
        type: Boolean,
        default: true
    }
})

module.exports = model('Empresa', SchemaEmpresa);