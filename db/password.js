const bcrypt = require('bcrypt');

module.exports = {
    digest: (password) => {
        const saltRounds = 10;
        const hash = bcrypt.hashSync(password,saltRounds)
        return hash
    },
    check: (password, hash) => {
        return bcrypt.compareSync(password,hash)
    }
}