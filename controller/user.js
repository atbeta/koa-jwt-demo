const { UserModel } = require('../model/user')
const passport = require('../middleware/passport')


const UserController = {
  async create(ctx) {
    const data = ctx.request.body
    ctx.body = await UserModel.create(data)
  },
  async getList(ctx) {
    console.log(ctx.isAuthenticated())
    ctx.body = await UserModel.findAll()
  },
  async login(ctx, next) {
    // const body = ctx.request.body
    // const user = await UserModel.findOne({
    //   where: {username: body.username}
    // })
    // if (!user) {
    //   ctx.body = {
    //     code: 1,
    //     message: '用户不存在'
    //   }
    //   return
    // }
    // if (user && user.password !== body.password) {
    //   ctx.body = {
    //     code: 1,
    //     message: '用户密码错误'
    //   }
    //   return
    // }
    // if (user && user.password === body.password) {
    //
    //   ctx.session.user = user
    //   ctx.body = {
    //     code: 0,
    //     message: '登录成功'
    //   }
    // }
    return passport.authenticate('local', function (err, user, info, status) {
      console.log(status)
      console.log(user)
      if (err) {
        ctx.body = {
          code: -1,
          msg: err
        }
      } else {
        if (user) {
          ctx.body = {
            code: 0,
            msg: '登录成功',
            user: {
              username: user.username,
              id: user.id
            }
          }
          return ctx.login(user)
        } else {
          ctx.body = {
            code: 1,
            msg: info
          }
        }
      }
    })(ctx, next)
  }
}

exports.UserController = UserController


