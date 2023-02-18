//自定义验证的配置
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'privateKey'
//定义验证函数
function myPassport(passport) {
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        //jwt_payload保存的是token生成时的对象
        // console.log("tok",jwt_payload)
        let num = jwt_payload.userTel
        //连接数据库，查看当前token中包含的唯一属性是否存在
        // done(null, jwt_payload)
        if(jwt_payload.userTel){
            //通过验证后执行下一步
            // console.log(111111111);
            done(null, jwt_payload)
        }else{
            //验证失败时报错
            done(null,false)
        }
    }));
}
module.exports = myPassport