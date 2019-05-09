const Client = require("mysql-pro");
const client = new Client({     
    mysql: {
          user: 'root',
          password: 'Xuhuan797128@',
          database: 'caibao',
          host: '129.204.68.78',
    }
}); 

module.exports = client;