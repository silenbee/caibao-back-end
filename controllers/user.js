/*
 * @Description: func for item
 * @Author: sheng
 * @Date: 2019-05-29 16:51:12
 * @LastEditTime: 2019-06-05 20:30:30
 * @LastEditors: Please set LastEditors
 */

const UID=require('uuid/v1')
const { query }=require('./async-db')


var logincheck=async(ctx,userid,userpass)=>{
    let sql="select UserPass from user where UserId='"+userid+"'"
    await query( sql ).then(async(res)=>{ 
        if(res.length==0){
            ctx.body={
                code:3,
                message:'iderror'
            }
        }
        else{
            await query( "select UserPass,UserName,UserPhone,Address from user,address where user.UserId=address.UserId and user.UserId = '"+userid+"'" ).then((data)=>{
                if(userpass!=data[0]['UserPass'])
                    ctx.body={
                        message:'passerror'
                    }
                    else 
                    ctx.body={
                        message:'success',
                        userdata:{
                            UserName:data[0].UserName,
                            UserPhone:data[0].UserPhone,
                            UserEmail:'12345@qq.com',
                            UserAccount:userid,
                            UserAddress:data[0].Address
                        }
                    }
                }).catch((err)=>{
                    ctx.body={
                        err:err
                    }
            });
        }    
    }).catch((err)=>{
        ctx.body={
            err:err
        }
    })
  
}

var register=async(ctx,userid,userpass,username,userphone)=>{
        let sql0="select * from user where UserID = '"+userid+"'"
        let sql="insert into user (UserID,UserName,UserPass,UserPhone) values ('"+userid+"','"+username+"','"+userpass+"','"+userphone+"')"
        await query(sql0).then(async(res)=>{
            if(res.length!=0){
                ctx.body={
                    message:'error',
                    tips:'id existed'
                }
            }
            else{
                await query(sql).then((result)=>{
                    ctx.body={
                        message:'success'
                    }
                }).catch((err)=>{
                    ctx.body={
                        err:err
                    }
                })
            }
        }).catch((err)=>{
            ctx.body={
                message:'error'
              }
        })

}

var getInfo=async(ctx,userid)=>{
    let sql="select UserID,UserName,UserPhone,IsAdmin from user where UserID = '"+userid+"'"
    await query(sql).then(async(res)=>{
        if(res.length!=0){
            ctx.body={
                message:'success',
                data:res[0]
            }
        }
        else{
            ctx.body={
                message:'error',
                tips:'no such user'
            }
        }
    }).catch((err)=>{
        ctx.body={
            message:err
          }
    })

}

var addAddress=async(ctx,userid,address)=>{
    let sql="insert into address values('"+userid+"','"+address+"')"
    await query(sql).then(async(res)=>{
            ctx.body={
                message:'success'
            }
    }).catch((err)=>{
        ctx.body={
            message:err
          }
    })

}

var getAddress=async(ctx,userid)=>{
    let sql="select Address from address where userId='"+userid+"'"
    await query(sql).then(async(res)=>{
        if(res.length!=0){
             ctx.body={
                message:'success',
                data:res
            } 
        }
        else{
            ctx.body={
                message:'error',
                tips:'no address'
            }
        }
    }).catch((err)=>{
        ctx.body={
            message:err
          }
    })

}

var modifyInfo=async(ctx,userid,username,userphone,address)=>{
    let sql="update user set UserPhone='"+userphone+"' and MainAddress = '"+address+"'and UserName='"+username+"' where UserId='"+userid+"'"
    await query(sql).then(async(res)=>{
            ctx.body={
                message:'success',
                data:{
                    userid:userid,
                    userphone:userphone,
                    address:address,
                    username:username
                }
            }
    }).catch((err)=>{
        ctx.body={
            message:err
          }
    })

}

module.exports = {logincheck,register,getInfo,addAddress,getAddress,modifyInfo}
