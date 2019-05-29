/*
 * @Description: func for item
 * @Author: sheng
 * @Date: 2019-05-29 16:51:12
 * @LastEditTime: 2019-05-29 17:04:31
 * @LastEditors: Please set LastEditors
 */

const UID=require('uuid/v1')
const { query }=require('../controllers/async-db')

var getitemlist=async(ctx)=>{
  
  let sql='sql';
  await query( sql ).then((res)=>{
        ctx.body=res;
    }).catch((err)=>{
      ctx.body={
        err:err
      }
    });
}






module.exports = {getitemlist}
