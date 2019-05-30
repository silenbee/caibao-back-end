const OrderController=require('../controllers/order')

class Order{
  constructor(){}
  createOrder(ctx,userid,orderid,veglist,money){
    return OrderController.createOrder(ctx,userid,orderid,veglist,money)
  }
  getMyOrder(ctx,userid){
    return OrderController.getMyOrder(ctx,userid)
  }

}


module.exports = {Order}