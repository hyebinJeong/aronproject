// // 필요한 모듈을 불러옵니다.
// const mysql = require('mysql');
// const faker = require('faker');

// // MariaDB에 연결.
// const conn = mysql.createConnection({
//     host : 'project-db-stu3.smhrd.com',
//     port : 3308,
//     user : 'Insa4_JSB_final_3',
//     password : 'aishcool3',
//     database : 'Insa4_JSB_final_3'
// });

// conn.connect((error)=>{
//     if (error) {
//         console.error('Error connecting to MariaDB : ', error)
//     } else {
//         console.log('Connected to MariaDB')

//         // 'data' 테이블에서 'patient_id' 값을 가져오기.
//         let sql = 'SELECT patient_id FROM data';
//         conn.query(sql, function (error, results, fields) {
//             if (error) throw error;
    
//             // 가져온 'patient_id' 값을 기반으로 가상 환자 데이터를 생성.
//             const patients = results.map(result => {
//                 return {
//                     patient_id: result.patient_id,
//                     name: faker.name.findName(),
//                     gender: faker.random.arrayElement(['M', 'F']),
//                     age: faker.random.number({ min: 10, max: 90 }),
//                     blood_type: faker.random.arrayElement(['A', 'B', 'AB', 'O']),
//                     admission_date: faker.date.past(),
//                     attending_doctor: faker.name.findName(),
//                     medical_department: faker.commerce.department(),
//                     ward_room: faker.random.number({ min: 101, max: 200 }).toString()
//                 };
//             });
    
//             // 각 환자 데이터를 'patient' 테이블에 저장.
//             patients.forEach(patient => {
//                 let sql = `
//                     INSERT INTO patient 
//                         (patient_id, name, gender, age, blood_type, admission_date, 
//                         attending_doctor, medical_department, sepsis_score, ward_room)
//                     VALUES
//                         (${patient.patient_id}, "${patient.name}", "${patient.gender}", 
//                         ${patient.age}, "${patient.blood_type}", "${patient.admission_date}", 
//                         "${patient.attending_doctor}", "${patient.medical_department}", 
//                         ${patient.sepsis_score}, "${patient.ward_room}")
//                 `;
//                 conn.query(sql, function (error, results, fields) {
//                     if (error) throw error;
//                 });
//             });
//         });
//     }
// });

// module.exports = conn;


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
