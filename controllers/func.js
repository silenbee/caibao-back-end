/*
 * @Description: func for item
 * @Author: sheng
 * @Date: 2019-05-29 16:51:12
 * @LastEditTime: 2019-05-29 19:34:06
 * @LastEditors: Please set LastEditors
 */

const { query }=require('./async-db')


var searchItem=async(ctx,key)=>{
    let sql="select * from item where item.itemName like '%"+key+"%' or itemType like '%"+key+"%'"
    await query( sql ).then((res)=>{
            console.log(res)
            if(res.length==0){
                ctx.body={
                    message:'error',
                    tips:'no data qualified!'
                }
            }
            else{
                ctx.body={
                    message:'success',
                    data:res
                }
            }
    }).catch((err)=>{
        ctx.body={
            message:'error'
        };
    });
}

var getType=async(ctx,key)=>{
        let sql="select * from item where itemType = '"+key+"'"
        await query( sql ).then((res)=>{
            if(res.length==0){
              console.log('no data')
              ctx.body={
                message:'error',
                tips:'no data qualified!'
              }
            }
            else{
                ctx.body={
                    message:'success',
                    data:res
                }
              }
        }).catch((err)=>{
            ctx.body={
                message:'error'
            };
        });
}










module.exports = {searchItem,getType}
