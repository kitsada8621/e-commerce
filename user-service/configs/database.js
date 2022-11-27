require('dotenv').config({path: '../.env'});
var PORT = parseInt(process.env.DB_PORT);

module.exports = {
  configuration: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: PORT,
    dialect: 'mysql',
    charset: 'utf8',
    collate: 'utf8_general_ci',
    pool: {
      max: 10,
      min: 0,
      acquire: 300000,
      idle: 10000,
      evict: 180000,
      maxUses: 60,
    }
  }
}