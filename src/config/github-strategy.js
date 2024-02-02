/*
App ID: 715702
Client ID: Iv1.0565a3a14597c7b5
Client Secret: 8fc61133701f64f455bed66bd17e715be67c04ee
*/

import { Strategy as GithubStrategy } from "passport-github2";
import passport from 'passport';
import UsersServices from "../services/users.services.js";
const usersServices = new UsersServices();

const strategyOptions = {
    clientID: 'Iv1.0565a3a14597c7b5',
    clientSecret: '8fc61133701f64f455bed66bd17e715be67c04ee',
    callbackURL: 'http://localhost:8080/github'
}

const registerOrLogin = async (accesToken, refreshToken, profile, done) => {
    // console.log(profile);
    const emailGitHub = profile._json.url;
    const nameGitHub = profile._json.name;
    const userGitHub = await usersServices.findUserByEmail(emailGitHub);
    if(userGitHub) return done(null, userGitHub);
    const newUser = await usersServices.createUser({
        first_name : nameGitHub,
        email: emailGitHub,
        isGitHub: true
    })
    return done(null, newUser);
}

passport.use('github', new GithubStrategy(strategyOptions, registerOrLogin));
