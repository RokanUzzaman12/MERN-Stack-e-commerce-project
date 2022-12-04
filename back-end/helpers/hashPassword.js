const bcrypt = require('bcrypt');
const saltRounds = 10;
 let result = null
 const hashPassword  = (pass) =>{
    bcrypt.hash(pass, saltRounds, function(err, hash) {
        result = hash
    })
    return result
 }

module.exports = hashPassword
