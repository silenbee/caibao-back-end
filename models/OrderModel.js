const OrderController=require('../controllers/order')

class Order{
  constructor(){}
  // create order
  createOrder(ctx,userid,orderid,veglist,money){
    return OrderController.createOrder(ctx,userid,orderid,veglist,money)
  }
  // get state of my order
  getMyOrder(ctx,userid){
    return OrderController.getMyOrder(ctx,userid)
  }
  // cancel my order
  cancelOrder(){}
  // order feedback
  orderFb(){}
  // comment the order
  commentOrder(){}

}


module.exports = {Order}