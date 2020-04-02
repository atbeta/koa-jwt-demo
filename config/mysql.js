const Sequelize = require('sequelize')

const sequelize = new Sequelize('demo', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql'/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
})

exports.sequelize = sequelize

