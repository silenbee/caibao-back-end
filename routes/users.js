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

router.post('/getMyInfo', async(ctx, next)=>{
  let userid=ctx.request.body.userid;
  let user=new User()
  await user.getMyInfo(ctx,userid)
})

router.post('/addMyAddress', async(ctx, next)=>{
  let userid=ctx.request.body.userid;
  let address=ctx.request.body.address;
  let user=new User()
  await user.addMyAddress(ctx,userid,address)
})

router.post('/getAddress', async(ctx, next)=>{
  let userid=ctx.request.body.userid;
  let user=new User()
  await user.getMyAddress(ctx,userid)
})

router.post('/modifyInfo', async(ctx, next)=>{
  let userid=ctx.request.body.userid;
  let userphone=ctx.request.body.userphone;
  let address=ctx.request.body.address;
  let username=ctx.request.body.username;
  let user=new User()
  await user.modifyInfo(ctx,userid,username,userphone,address)
})

module.exports = router
