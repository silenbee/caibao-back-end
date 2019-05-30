const router = require('koa-router')()
const UID=require('uuid/v1')
router.prefix('/v0/order')

const {Order}=require('../models/OrderModel')

var order=new Order()

router.post('/createorder', async (ctx) => {
  console.log('order add')
  let userid='10161768';
  let orderid=UID();
  let veglist=ctx.request.body.veglist;
  let money=ctx.request.body.totalprice;
  await order.createOrder(ctx,userid,orderid,veglist,money)
})

router.post('/getOrder', async (ctx) => {
  let userid=ctx.request.body.userid;
  await order.getMyOrder(ctx,userid)
})

module.exports = router
