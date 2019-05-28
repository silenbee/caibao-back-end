const router = require('koa-router')()
const db = require('./dbConfig')
router.prefix('/v0/func')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})


router.post('/search', async(ctx, next)=>{
  let key=ctx.request.body.key
  let query=()=>{
      return new Promise((resolve,reject)=>{
          db.query("select * from item where item.itemName like '%"+key+"%' or itemType like '%"+key+"%'",(err,data)=>{
              console.log(data)
              if(err){
                console.log(err)
                resolve({
                  message:'error'
                })
              } 
              if(data.length==0){
                  console.log('no data')
                  resolve({
                      message:'error',
                      tips:'no data qualified!'
                  })
              }
              else{
                   resolve({
                       message:'success',
                       data:data
                   })
              }
          })
      })
  }
  let result=await query();
  ctx.body=result;
})

router.post('/getType', async(ctx, next)=>{
    let key=ctx.request.body.type
    let query=()=>{
        return new Promise((resolve,reject)=>{
            db.query("select * from item where itemType = '"+key+"'",(err,data)=>{
                console.log(data)
                if(err){
                  console.log(err)
                  resolve({
                    message:'error'
                  })
                } 
                if(data.length==0){
                    console.log('no data')
                    resolve({
                        message:'error',
                        tips:'no data qualified!'
                    })
                }
                else{
                     resolve({
                         message:'success',
                         data:data
                     })
                }
            })
        })
    }
    let result=await query();
    ctx.body=result;
  })


module.exports = router
