const router = require('koa-router')()
const db=require('./dbConfig')
const UID=require('uuid/v1')

const orderController=require('../controllers/order')
router.prefix('/v0/order')

router.post('/createorder', async (ctx) => {
  console.log('order add')
  let userid='10161768';
  let orderid=UID();
  let veglist=ctx.request.body.veglist;
  let money=ctx.request.body.totalprice;
  await orderController.createOrder(ctx,userid,orderid,veglist,money)
})



module.exports = router
