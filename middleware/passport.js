const passport = require('koa-passport')
const LocalStrategy = require('passport-local').Strategy
const { UserModel } = require('../model/user')

passport.serializeUser(function(user, done) {
  console.log('serializeUser: ', user)
  done(null, user.id)
})

passport.deserializeUser(async function(id, done) {
  console.log('deserializeUser: ', id)
  done(null, id)
})

passport.use(new LocalStrategy(
  async function(username, password, done) {
    console.log('LocalStrategy', username, password)
    const user =  await UserModel.findOne({
      where: {
        username
      }
    })
    done(null, user, {msg: 'this is a test'})
  }
))

module.exports = passport
