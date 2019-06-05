const router = require('koa-router')()
const {Func} = require('../models/funcModel')
router.prefix('/v0/func')

const func=new Func

router.get('/', function (ctx, next) {
  ctx.body = 'this is a func response!'
})


router.post('/search', async(ctx, next)=>{
  let key=ctx.request.body.key
  await func.searchItem(ctx,key);
})

router.post('/getType', async(ctx, next)=>{
    let key=ctx.request.body.type
    await func.getType(ctx,key)
})

router.post('/getOrderNum', async(ctx, next)=>{
  await func.getOrderNum(ctx)
})

router.post('/getProfit', async(ctx, next)=>{
  await func.getProfit(ctx,)
})

router.post('/addAdmin', async(ctx, next)=>{
  let userid=ctx.request.body.userid
  await func.addAdmin(ctx,userid)
})

router.post('/deleteAdmin', async(ctx, next)=>{
  let userid=ctx.request.body.userid
  await func.deleteAdmin(ctx,userid)
})

module.exports = router
