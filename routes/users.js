const router = require('koa-router')()
const db = require('./dbConfig')
router.prefix('/v0/user')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.post('/logincheck', async(ctx, next)=>{
  let userid=ctx.request.body.userid;
  let userpass=ctx.request.body.userpass;
  console.log('pass:'+userpass)
  let query=()=>{
      return new Promise((resolve,reject)=>{
          db.query("select UserPass from user where UserId='"+userid+"'",async(err,data)=>{
            console.log(data[0])
              if(err)
                  console.log(err)
              if(data.length==0){
                resolve({
                  code:3,
                  message:'iderror'
                })
              }
              else{
                db.query("select UserPass,UserName,UserPhone from user where UserId = '"+userid+"'",async(err,data)=>{
                  console.log('UserPass'+data[0]['UserPass'])
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
                })
              }
          })
      })
  }
  let result=await query();
  ctx.body=result;
})

router.post('/register', async(ctx, next)=>{
  let userid=ctx.request.body.userid;
  let userpass=ctx.request.body.userpass;
  let username=ctx.request.body.username;
  let userphone=ctx.request.body.userphone;
  let query=()=>{
      return new Promise((resolve,reject)=>{
        var para=[userid,username,userpass,userphone]
          db.query("insert into user (UserID,UserName,UserPass,UserPhone) values ('"+userid+"','"+username+"','"+userpass+"','"+userphone+"')",(err,data)=>{
              if(err){
                console.log(err)
                resolve({
                  message:'error'
                })
              } 
              else{
                   resolve({message:'success'})
              }
          })
      })
  }
  let result=await query();
  ctx.body=result;
})

module.exports = router
