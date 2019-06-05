const router = require('koa-router')()

const {Item}=require('../models/itemModel')

const item=new Item()

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
  await item.getitemlist(ctx);
})


router.get('/v0/itemnum',async(ctx)=>{
  //res.header('Content-Type','application/json');
  //ctx.set("Content-Type", "application/json") 
  await item.getItemNum(ctx);
})

router.post('/v0/modifyItem',async(ctx)=>{
  let itemid=ctx.request.body.itemid
  await item.modifyItem(itemid,ctx);
})

router.post('/v0/getNumByClass',async(ctx)=>{
  let itemid=ctx.request.body.itemclass
  await item.getNumByClass(itemclass,ctx);
})

// router.post('/v0/addItem',async(ctx)=>{
//   let itemid=ctx.request.body.itemclass
//   await item.addItem(a,b,c,d,e,f,ctx);
// })

router.post('/v0/deleteItem',async(ctx)=>{
  let itemid=ctx.request.body.itemid
  await item.deleteItem(itemid,ctx);
})

module.exports = router
