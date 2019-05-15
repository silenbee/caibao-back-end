const router = require('koa-router')()
const db=require('./dbConfig')
const UID=require('uuid/v1')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Caibao!'
  })
})

router.get('/v0/hello', async (ctx, next) => {
  let i=9;
  if(!i){
    console.log('furuu')
      await ctx.render('index', {
      title: 'Hello Caibao!'
    })
  }
  else{
    console.log('yeryey')
    await ctx.render('index', {
    title: 'Hello error!'
  })
  }
  
})

router.get('/v0/itemlist',async(ctx)=>{
  //res.header('Content-Type','application/json');
  //ctx.set("Content-Type", "application/json") 

  let query=()=>{
      return new Promise((resolve,reject)=>{
          db.query("select * from item",async(err,data)=>{
            console.log(data[0].VegName)
              if(err)
                  console.log(err)
              if(data.length==0){
                resolve({
                  code:3,
                  message:'no data'
                })
              }
              else{
                resolve(data)
              }
          })
      })
  }
  let result=await query();
  ctx.body=result;
})

router.get('/v0/itemnum',async(ctx)=>{
  //res.header('Content-Type','application/json');
  //ctx.set("Content-Type", "application/json") 

  let query=()=>{
      return new Promise((resolve,reject)=>{
          db.query("select count(*) as sum from item",async(err,data)=>{
            console.log(data[0].itemName)
              if(err)
                  console.log(err)
              if(data.length==0){
                resolve({
                  message:'error'
                })
              }
              else{
                resolve(data[0])
              }
          })
      })
  }
  let result=await query();
  ctx.body=result;
})

router.post('/v0/cart', async (ctx) => {
  //ctx.set("Content-Type", "application/json") 
  console.log('cart add')
  let userid='10161768';
  let cartid=UID();
  // let cartid=123456;
  let veglist=ctx.request.body.veglist;
  var count=0;
  let query=()=>{ 
    return new Promise((resolve,reject)=>{
      for(var i=0;i<veglist.length;i++){
        let vegid=veglist[i].vegid;
        let vegnum=veglist[i].vegnum;
        console.log('id:'+vegid)
        let param=[userid,vegid,cartid,vegnum];
        db.query("insert into cart (CustomerID,VegID,CartID,VegSize) values (?,?,?,?)",param,async(err,data)=>{
          if(err)
            {
                console.log(err)
                resolve({
                  message:'error'
                })
            }
        })  
        if(i==veglist.length-1){
            resolve({
              message:'success'
            })
          }
     }
  }) 
}

  let res=await query();
  ctx.body=res;

})


router.post('/v0/order', async (ctx) => {
  //ctx.set("Content-Type", "application/json") 
  console.log('order add')
  let userid='10161768';
  let orderid=UID();
  // let cartid=123456;
  let veglist=ctx.request.body.veglist;
  let money=ctx.request.body.totalprice;
  //let money=100
  let query=()=>{ 
    return new Promise((resolve,reject)=>{
      for(var i=0;i<veglist.length;i++){
        console.log('i:'+i)
        let vegid=veglist[i].vegid;
        let vegnum=veglist[i].vegnum;
        console.log('id:'+vegid)
        let param=[userid,vegid,orderid,vegnum];
        db.query("insert into orderdetail (CustomerID,ItemID,OrderID,ItemSize) values ('10161768','"+vegid+"','"+orderid+"',"+vegnum+")",(err,data)=>{
          if(err)
            {
                console.log(err)
                resolve({
                  message:'error'
                })
            }
            else{
              console.log('order detail i:'+i)
            }
            
        })
        if(i==veglist.length-1){
          db.query("insert into vorder(OrderID,CustomerID,OrderMoney) values ('"+orderid+"','10161768',"+money+")",async(err,data)=>{
            if(err)
              {
                  console.log(err)
                  resolve({
                    message:'error'
                  })
              }
              else{
                console.log('vorder done!')
                resolve({
                  message:'success'
                })
              }
              
          })
        }  
     }
     //resolve(money)
  }) 
}
let res=await query();
console.log('done!!')
ctx.body=res;

    // let res=await query().then((data)=>{
    //   console.log('data:'+data)
    //   return new Promise((resolve,reject)=>{
    //     db.query("insert into vorder(OrderID,CustomerID,OrderMoney) values ('"+orderid+"','10161768',"+data+")",async(err,data)=>{
    //       if(err)
    //         {
    //             console.log(err)
    //             resolve({
    //               message:'error'
    //             })
    //         }
    //         else{
    //           resolve({
    //             message:'success'
    //           })
    //         }
            
    //     })
    //   })  
    // })

    // ctx.body=res;
        

})



module.exports = router
