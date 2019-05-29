const router = require('koa-router')()
const db = require('./dbConfig')
const funcController = require('../controllers/func')
router.prefix('/v0/func')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a func response!'
})


router.post('/search', async(ctx, next)=>{
  let key=ctx.request.body.key
  await funcController.searchItem(ctx,key);
})

router.post('/getType', async(ctx, next)=>{
    let key=ctx.request.body.type
    await funcController.getType(ctx,key)
  })


module.exports = router
