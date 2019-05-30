/*
 * @Description: func for item
 * @Author: sheng
 * @Date: 2019-05-29 16:51:12
 * @LastEditTime: 2019-05-30 16:28:24
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
            await query( "select UserPass,UserName,UserPhone from user where UserId = '"+userid+"'" ).then((data)=>{
                if(userpass!=data[0]['UserPass'])
                    ctx.body={
                        message:'passerror'
                    }
                    else 
                    ctx.body={
                        message:'success',
                        userdata:{
                            UserName:data[0].UserName,
                            UserPhone:data[0].UserPhone
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

module.exports = {logincheck,register}
