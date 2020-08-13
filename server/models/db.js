import tables from '../config/tables'
import { logins, db } from '../config/config'
import { createConnection } from 'mysql'

const dbc = createConnection(logins, db)
dbc.connect((err) => {
	if (err) throw err
})

class DB {
    constructor() {
        this.name = db
    }
    static create() {
        dbc.query(`CREATE DATABASE ${db}`, (err, res) => {
            if (err) {
                console.log(`DB: ${db} -> (found)`)
                return (0)
            }
            else {
                console.log(`DB: ${db} -> (created)`)
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
        dbc.query(`USE ${db}`, (err, res) => {
            if (err) {
                console.log(`DB: ${db} -> (not found)`)
                DB.configure()
                return (0)
            }
            else {
                console.log(`DB: ${db} -> (connected)`)
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

export default DB