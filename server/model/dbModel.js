const tables = require('../config/tables')
const config = require('../config/config')
const mysql = require('mysql')

const dbc = mysql.createConnection(config.logins, config.db)
dbc.connect((err) => {
	if (err) throw err
})

class DB {
    constructor() {
        this.name = config.db
    }
    static create() {
        dbc.query(`CREATE DATABASE ${config.db}`, (err, res) => {
            if (err) {
                console.log(`DB: ${config.db} -> (found)`)
                return (0)
            }
            else {
                console.log(`DB: ${config.db} -> (created)`)
                return (1)
            }
        })
    }
    static tables() {
        for (let t_name in tables) {
            var sql = tables[t_name]
            dbc.query(sql, (err, res) => {
                var msg = `T: ${t_name} -> `
                if (err) {
                    if (err.errno === 1050)
                        msg += "(found)"
                    else
                        console.log(err)
                }
                else {
                    msg += "(created)"
                }
                console.log(msg)
            })
        }
    }
    static configure() {
        DB.create()
        DB.init()
        DB.tables()
    }
    static init() {
        dbc.query(`USE ${config.db}`, (err, res) => {
            if (err) {
                console.log(`DB: ${config.db} -> (not found)`)
                DB.configure()
                return (0)
            }
            else {
                console.log(`DB: ${config.db} -> (connected)`)
                return (1)
            }
        })
    }
    static insert(sql, values, callback) {
        dbc.query(sql, values, (err, res) => {
            if (err)
                callback(err, null)
            else
                callback(null, res)
        })
    }
    static fetch(sql, callback) {
        var r = dbc.query(sql, (err, result, fields) => {
            if (err)
                callback(err, null)
            else
                callback(null, result)
        })
    }
}







module.exports = DB;



