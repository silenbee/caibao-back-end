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

let insertData = function( sql, values ) {
    return new Promise(( resolve, reject ) => {
      pool.getConnection(function(err, connection) {
        if (err) {
          reject( err )
        } else {
          connection.query(sql, values, ( err, rows) => {
  
            if ( err ) {
              reject( err )
            } else {

              resolve( 'success' )
             
            }
            connection.release()
          })
        }
      })
    })
  }

async function getData( ) {
  let sql = 'insert into orderdetail (CustomerID,ItemID,OrderID,ItemSize) values (?,?,?,?)'
  params=['1','1','1',111]
  let data = await insertData(sql,params)
  console.log(data)
}

getData();
