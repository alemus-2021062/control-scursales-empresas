const jwt = require('jsonwebtoken');

// jwt trabaja en base a callbacks y en base a promesas
const generarJWT = ( eid = '' ) => {

    return new Promise( (resolve, reject) => {

        const payload = { eid }

        jwt.sign( payload, process.env.SECRET_KEY, {
            expiresIn: '1h'
        }, ( err, token ) => {

            if ( err ) {
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                resolve( token );
            }

        } )

    } );

}


module.exports = {
    generarJWT
}