const UserController=require('../controllers/user')

class User{
    constructor(a, b) {
        this.userid = a;
        this.userpass = b;
    }

    login(ctx){
        return UserController.logincheck(ctx,this.userid, this.userpass)
    }

    register(a,b,c,d,e){
        return UserController.register(a,b,c,d,e)
    }

    getMyInfo(ctx,userid){
        return UserController.getInfo(ctx,userid)
    }

    modifyInfo(ctx){}

    getMyAddress(ctx,userid){
        return UserController.getAddress(ctx,userid)
    }

    addMyAddress(ctx,userid,address){
        return UserController.addAddress(ctx,userid,address)
    }

    deleteAddress(ctx){}

}


module.exports = {User}
