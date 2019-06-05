/*
 * @Description: func for item
 * @Author: sheng
 * @Date: 2019-05-29 16:51:12
 * @LastEditTime: 2019-06-05 14:36:53
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

var getMoney=async(ctx,key)=>{
    let sql="select sum(OrderMoney) as totalmoney from vorder"
    await query( sql ).then((res)=>{
        if(res.length==0){
          console.log('no order')
          ctx.body={
            message:'error',
            tips:'no order yet!'
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

var addAdmin=async(ctx,userid)=>{
    let sql="update user set IsAdmin=1 where UserID = '"+userid+"'"
    await query( sql ).then((res)=>{
        ctx.body={
            message:'success',
        }
    }).catch((err)=>{
        ctx.body={
            message:'error'
        };
    });
}

var deleteAdmin=async(ctx,userid)=>{
    let sql="update user set IsAdmin=0 where UserID = '"+userid+"'"
    await query( sql ).then((res)=>{
        ctx.body={
            message:'success',
        }
    }).catch((err)=>{
        ctx.body={
            message:'error'
        };
    });
}

var getOrderNum=async(ctx)=>{
    let sql="select count(*) as orderNum from vorder"
    await query( sql ).then((res)=>{
        if(res.length==0){
          console.log('no order')
          ctx.body={
            message:'error',
            tips:'no order yet!'
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




module.exports = {searchItem,getType,getMoney,addAdmin,deleteAdmin,getOrderNum}
