/*
 * @Description: func for item
 * @Author: sheng
 * @Date: 2019-05-29 16:51:12
 * @LastEditTime: 2019-05-29 17:44:41
 * @LastEditors: Please set LastEditors
 */

const UID=require('uuid/v1')
const { query }=require('./async-db')


var logincheck=async(userid,userpass)=>{
    return new Promise(async(resolve,reject)=>{
        let sql="select UserPass from user where UserId='"+userid+"'"
        await query( sql ).then((res)=>{ 
            if(res.length==0){
            resolve({
                code:3,
                message:'iderror'
                })
            }
            else{
                  query( "select UserPass,UserName,UserPhone from user where UserId = '"+userid+"'" ).then((data)=>{
                    if(userpass!=data[0]['UserPass'])
                        resolve({
                            message:'passerror'
                        })
                        else resolve({
                        message:'success',
                        userdata:{
                            UserName:data[0].UserName,
                            UserPhone:data[0].UserPhone
                        }
                        })
                    }).catch((err)=>{
                        reject(err)
                });
            }    
        }).catch((err)=>{
            reject(err)
        });
    })
  
}

var register=async(userid,userpass,username,userphone)=>{
    return new Promise(async(resolve,reject)=>{
        let sql="insert into user (UserID,UserName,UserPass,UserPhone) values ('"+userid+"','"+username+"','"+userpass+"','"+userphone+"')"
        await query(sql).then((res)=>{
            resolve({message:'success'})
        }).catch((err)=>{
            resolve({
                message:'error'
              })
        })
    })

}

module.exports = {logincheck,register}
