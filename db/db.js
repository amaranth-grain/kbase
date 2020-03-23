const Pool = require('pg').Pool;

const pool = new Pool({  
    host: 'ec2-23-22-156-110.compute-1.amazonaws.com',  
    user: 'nskwnwyoqdodwn',  
    database: 'dabjf6dgh3fklk',  
    password: 'd8d6576ccbf638b94c34209f9e98b31e32836866915965f843b8f6e541123818',
    port: 5432,
    ssl: true
});  

module.exports = pool;