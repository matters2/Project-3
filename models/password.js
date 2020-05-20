const bcrypt = require('bcrypt');
const db = require("../db/config")


const verifyPassword = (username, password, cb) => {
    db.query(
        "SELECT * FROM users WHERE username = $1;",
        [username],
        (err,dbRes) => {
            userDetails = dbRes.rows[0]
            if (userDetails == []) { // user not found
                return cb(null, false) 
            }
            if (bcrypt.compareSync(password, userDetails.password_digest)) { // user found, password correct
                return cb(null, user); 
            } else {
                return cb(null, false); // user found, password incorrect
            }
        }
    )
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
    verifyPassword: verifyPassword
}

