const FuncController=require('../controllers/func')

class Func{
  constructor(){}
  searchItem(ctx,key){
    return FuncController.searchItem(ctx,key)
  }
  getType(ctx,key){
    return FuncController.getType(ctx,key)
  }

}

module.exports = {Func}
