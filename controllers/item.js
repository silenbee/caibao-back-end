/*
 * @Description: func for item
 * @Author: sheng
 * @Date: 2019-05-29 16:51:12
 * @LastEditTime: 2019-05-29 18:48:22
 * @LastEditors: Please set LastEditors
 */

const UID=require('uuid/v1')
const { query }=require('./async-db')


var getitemlist=async(ctx)=>{
        let sql="select * from item"
        await query( sql ).then((res)=>{
                ctx.body=res;
        }).catch((err)=>{
            ctx.body=err;
        });
}

var getItemNum=async(ctx)=>{
        let sql="select count(*) as sum from item"
        await query( sql ).then((res)=>{
            if(res.length==0){
              ctx.body={
                  message:error
              }
            }
            else{
                ctx.body=res[0]
              }
        }).catch((err)=>{
            ctx.body=err;
        });
}










module.exports = {getitemlist,getItemNum}
