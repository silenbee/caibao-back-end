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


module.exports = router
