/*
App ID: 715702
Client ID: Iv1.0565a3a14597c7b5
Client Secret: 8fc61133701f64f455bed66bd17e715be67c04ee
*/

import { Strategy as GithubStrategy } from "passport-github2";
import passport from 'passport';
import UserServices from "../services/user.services.js";
const userServices = new UserServices();

const strategyOptions = {
    clientID: 'Iv1.0565a3a14597c7b5',
    clientSecret: '8fc61133701f64f455bed66bd17e715be67c04ee',
    callbackURL: 'http://localhost:8080/api/users/github'
}

const registerOrLogin = async (accesToken, refreshToken, profile, done) => {
    // console.log(profile);
    const email = profile._json.email;
    const user = await userServices.findByEmail(email);
    if(user) return done(null, user);
    const newUser = await userServices.register({
        first_name : profile._json.name,
        email,
        isGitHub: true
    })
    return done(null, newUser);
}

passport.use('github', new GithubStrategy(strategyOptions, registerOrLogin));