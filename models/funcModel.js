const FuncController=require('../controllers/func')

class Func{
  constructor(){}
  searchItem(ctx,key){
    return FuncController.searchItem(ctx,key)
  }

  getType(ctx,key){
    return FuncController.getType(ctx,key)
  }

  getOrderNum(ctx){
    return FuncController.getOrderNum(ctx)
  }

  getProfit(ctx){
    return FuncController.getMoney(ctx)
  }

  addAdmin(ctx,userid){
    return FuncController.addAdmin(ctx,userid)
  }

  deleteAdmin(ctx,userid){
    return FuncController.deleteAdmin(ctx,userid)
  }

}

module.exports = {Func}
