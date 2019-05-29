const router = require('koa-router')()
const db = require('./dbConfig')
const user=require('../controllers/user')
router.prefix('/v0/user')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})


router.post('/logincheck', async(ctx, next)=>{
  let userid=ctx.request.body.userid;
  let userpass=ctx.request.body.userpass;
  console.log('pass:'+userpass)
  await user.logincheck(userid,userpass).then((res)=>{
    ctx.body=res
  }).catch((err)=>{
    ctx.body={err:err}
  })
})


router.post('/register', async(ctx, next)=>{
  let userid=ctx.request.body.userid;
  let userpass=ctx.request.body.userpass;
  let username=ctx.request.body.username;
  let userphone=ctx.request.body.userphone;
  await user.register(userid,username,userpass,userphone)
    .then((res)=>{
      ctx.body=res;
    }).catch((err)=>{
      ctx.body={
        err:err
      }
    })
})

module.exports = router
