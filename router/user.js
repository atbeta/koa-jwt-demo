const Router = require('koa-router')
const { UserController } = require('../controller/user')

const router = new Router({
  prefix: '/api'
})

/**
 * 用户接口
 */
// 用户注册
router.get('/users', UserController.getList)
router.post('/user', UserController.create)
router.post('/login', UserController.login)
exports.UserRouter = router
