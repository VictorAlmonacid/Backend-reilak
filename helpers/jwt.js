const jwt = require('jsonwebtoken');


const generarJWT = (uid, name) => {
    return new Promise((resolve, reject)=>{
        const payload = {uid, name};
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token)=>{
            if(err){
                console.log(err)
                reject('No se pudo generar el token');
            }

            resolve(token);
        })
    })
}
const comprobarJWT = ( token = '' ) => {

    try {
        const { uid } = jwt.verify( token, process.env.SECRET_JWT_SEED );
        console.log('true')
        return [ true, uid ];

    } catch (error) {
        console.log('false')
        return [ false, null ];
        
    }

}


module.exports = {
    generarJWT,
    comprobarJWT
}