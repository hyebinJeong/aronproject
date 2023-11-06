const maria = require('mysql');

const conn = maria.createConnection({
    host : 'project-db-stu3.smhrd.com',
    port : 3308,
    user : 'Insa4_JSB_final_3',
    password : 'aishcool3',
    database : 'Insa4_JSB_final_3'
});
conn.connect((error)=>{
    if (error) {
        console.error('Error connectiog to mariaDB : ', error)
    } else {
        console.log('connected to mariaDB')
    }
});

module.exports = conn;