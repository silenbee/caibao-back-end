/*
 * @Description: func for item
 * @Author: sheng
 * @Date: 2019-05-29 16:51:12
 * @LastEditTime: 2019-05-30 12:23:26
 * @LastEditors: Please set LastEditors
 */

const { query }=require('./async-db')


var createOrder=async(ctx,userid,orderid,veglist,money)=>{
        
        for(var i=0;i<veglist.length;i++){
            console.log('i:'+i)
            let vegid=veglist[i].vegid;
            let vegnum=veglist[i].vegnum;
            console.log('id:'+vegid)
            let sql="insert into orderdetail (CustomerID,ItemID,OrderID,ItemSize) values ('10161768','"+vegid+"','"+orderid+"',"+vegnum+")"
            await query( sql ).then((res)=>{
                console.log('order detail i:'+i)
            }).catch((err)=>{
                ctx.body={ message:'error'};
            });
            if(i==veglist.length-1){
                let sql1="insert into vorder(OrderID,CustomerID,OrderMoney) values ('"+orderid+"','10161768',"+money+")"
                await query( sql1 ).then((res)=>{
                    console.log('vorder done!')
                    ctx.body={
                      message:'success'
                    }
                }).catch((err)=>{
                    ctx.body={ message:'error'};
                });
            }
        }

}

var getMyOrder=async(ctx,userid)=>{
    var result=[];
    let sql="select OrderID from vorder where CustomerID = '"+userid+"'"
    await query(sql).then(async(res)=>{
        if(res.length==0){
            ctx.body={
                message:'no data'
            }
        }
        else{
            for(let i=0;i<res.length;i++){
                let sqltmp="select * from orderdetail where orderID = '"+res[i]['OrderID']+"'"
               
                await query(sqltmp).then(async(data)=>{
                    await result.push({
                        orderid:res[i]['OrderID'],
                        orderdetail:[]
                    })
                    for(let j=0;j<data.length;j++){
                        //console.log(data[j])
                        result[i]['orderdetail'].push(data[j])
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            }
            ctx.body=result
        }
    }).catch((err)=>{
        console.log(err)
        ctx.body={
            err:err
        }
    })
}




module.exports = {createOrder,getMyOrder}
