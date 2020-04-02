const Sequelize =require('sequelize')
const { sequelize } = require('../config/mysql')

class UserModel extends Sequelize.Model {}
const model = {
  // attributes
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING
    // allowNull defaults to true
  }
}

UserModel.init(model, {
  sequelize,
  modelName: 'user'
})

UserModel.sync()

exports.UserModel = UserModel
