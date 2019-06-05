/*
 * @Description: func for item
 * @Author: sheng
 * @Date: 2019-05-29 16:51:12
 * @LastEditTime: 2019-06-05 14:54:10
 * @LastEditors: Please set LastEditors
 */
const ItemController=require('../controllers/item')

class ItemData{
   constructor(a,b,c,d,e,f){
     this.ItmeID=a
     this.ItmeName=b
     this.ItmeURL=c
     this.ItmePrice=d
     this.ItmeType=e
     this.Stock=f
   }
}

class Item{
  constructor(){}

  getItemList(a){
    return ItemController.getitemlist(a)
  }

  getItemNum(a){
    return ItemController.getItemNum(a)
  }

  modifyItem(itemid,ctx){
    return ItemController.modifyItem(itemid,ctx)
  }

  getNumByClass(itemclass,ctx){
    return ItemController.getNumByClass(itemclass,ctx)
  }

  // add item into list  
  addItem(a,b,c,d,e,f,ctx){
    let item=new itemData(a,b,c,d,e,f)
    return ItemController.addItem(item,ctx)
  }

  deleteItem(itemid,ctx){
    return ItemController.deleteItem(itemid,ctx)
  }

}


module.exports = {Item,ItemData}
