/*
 * @Description: In User Settings Edit
 * @Author: sheng
 * @Date: 2019-05-29 15:35:27
 * @LastEditTime: 2019-05-29 15:41:55
 */

const mysql = require('mysql')

const pool = mysql.createPool({
    user: 'root',
    password: 'Xuhuan797128@',
    database: 'caibao',
    host: '129.204.68.78',
})

let query = function( sql, values ) {
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {

          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })
}

module.exports = { query }