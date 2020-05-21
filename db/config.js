const pg = require('pg');
let pool

if (process.env.PRODUCTION) {
    pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL
    })
} else {
    pool = new pg.Pool({
        database: 'mypet',
        password: 'ubuntu'
    })
}

module.exports = {
    query: (sql, params, callbackFn) => {
        return pool.query(sql, params, callbackFn)
    }
}