const bcrypt = require('bcrypt');
const db = require("../db/config")



const pwCheck = (userObject, inputPw, cb) => {
    if (bcrypt.compareSync(inputPw, userObject.password_digest)) { 
        return cb(null, userObject); 
    } else {
        return cb(null, false)
    }
}



//     .findByUsername(username, function(err, user) {
//       if (err) { return cb(err); }
//       if (!user) { return cb(null, false); } // user not found
//       if (user.password != password) { return cb(null, false); } // password incorrect
//       return cb(null, user);
//     });
//   }
    
module.exports = {
    digest: (password) => {
        const saltRounds = 10;
        const hash = bcrypt.hashSync(password,saltRounds)
        return hash
    },
    pwCheck: pwCheck
}

