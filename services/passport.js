const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys')

const User = mongoose.model('users') // one argument means we are fetching sonething and more than one arg means we are loading something to mongoose model

  passport.serializeUser((user,done)=>{
    done(null, user.id);
  });

passport.deserializeUser((id,done) =>{
User.findById(id)
.then((user) =>{
  done(null,user);
})
})


passport.use( new GoogleStrategy({
  clientID:keys.googleClientID,
  clientSecret:keys.googleClientSecret,
  callbackURL:'/auth/google/callback',
  proxy:true
},
async(accessToken,refreshToken,profile,done)=>{
  const existingUser = await User.findOne({googleId:profile.id})

    if(existingUser){
      //we already have a record with same id
    return  done(null,existingUser);
    } 
      //we document, make a new record
      const user = await new User({googleId:profile.id}).save();  //create a new modal instance 
      done(null,user);
    
}));
