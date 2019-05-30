
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
}


module.exports = {User}
