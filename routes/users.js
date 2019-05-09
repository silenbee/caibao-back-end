const router = require('koa-router')()

router.prefix('/v0/user')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.post('logincheck', async(ctx, next)=>{
  let userid=ctx.request.body.userid;
  let userpass=ctx.request.body.userpass;
  console.log('pass:'+userpass)
  let query=()=>{
      return new Promise((resolve,reject)=>{
          db.query("select userPass from user where userId='"+userid+"'",async(err,data)=>{
            console.log(data[0])
              if(err)
                  console.log(err)
              if(data.length==0){
                resolve({
                  code:3,
                  message:'nameerror'
                })
              }
              else{
                db.query("select userPass,userName from user where userId = '"+userid+"'",async(err,data)=>{
                  if(userpass!=data[0]['userPass'])
                    resolve({
                      message:'passerror'
                    })
                  else resolve({message:'success'})
                })
              }
          })
      })
  }
  let result=await query();
  ctx.body=result;
})

module.exports = router
