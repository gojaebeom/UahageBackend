"use strict";
const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

passport.use(new KakaoStrategy({
    clientID : process.env.KAKAO_CLIENT_ID,
    clientSecret: "", // clientSecret을 사용하지 않는다면 넘기지 말거나 빈 스트링을 넘길 것
    callbackURL : process.env.KAKAO_CALLBACKURL,
},
(accessToken, refreshToken, profile, done) => {
    // authorization 에 성공했을때의 액션
    console.log(`accessToken : ${accessToken}`);
    console.log(`사용자 profile: ${JSON.stringify(profile._json)}`);
    let user = {
        profile: profile._json,
        accessToken: accessToken
    }
    return done(null, user);
}));

passport.serializeUser(function (user, done) {
    console.log(`user : ${user.profile.id}`);
    done(null, user);
});
passport.deserializeUser(function (obj, done) {
    console.log(`obj : ${obj}`);
    done(null, obj);
});

module.exports = passport;