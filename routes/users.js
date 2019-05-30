const router = require('koa-router')()
const {User}=require('../models/userModel')
router.prefix('/v0/user')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})


router.post('/logincheck', async(ctx, next)=>{
  let userid=ctx.request.body.userid;
  let userpass=ctx.request.body.userpass;
  //console.log('pass:'+userpass)
  let user=new User(userid,userpass)
  await user.login(ctx)
})

router.post('/register', async(ctx, next)=>{
  let userid=ctx.request.body.userid;
  let userpass=ctx.request.body.userpass;
  let username=ctx.request.body.username;
  let userphone=ctx.request.body.userphone;
  let user=new User(userid,userpass)
  await user.register(ctx,userid,username,userpass,userphone)
})

module.exports = router
