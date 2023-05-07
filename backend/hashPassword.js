const bcrypt = require('bcrypt');


const generator = {
    'hashPassword':(plainPassword)=>{
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(plainPassword, salt);
    
        return hash;
    },
    'plainPassword':(plainPassword,hash)=>{
        const result = bcrypt.compareSync(plainPassword, hash);
        
        return result;
    }
}


module.exports = generator;