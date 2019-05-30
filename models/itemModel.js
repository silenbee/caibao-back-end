/*
 * @Description: func for item
 * @Author: sheng
 * @Date: 2019-05-29 16:51:12
 * @LastEditTime: 2019-05-30 16:38:57
 * @LastEditors: Please set LastEditors
 */
const ItemController=require('../controllers/item')

class Item{
  constructor(){}
  getItemList(a){
    return ItemController.getitemlist(a)
  }
  getItemNum(a){
    return ItemController.getItemNum(a)
  }

}





module.exports = {Item}
