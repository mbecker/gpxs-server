const db = require('./../db')
const passport = require('passport')
const StravaStrategy = require('passport-strava-oauth2').Strategy

const stravaConfig = {
    clientID: process.env.STRAVA_CLIENT_ID,
    clientSecret: process.env.STRAVA_CLIENT_SECRET,
    callbackURL: process.env.STRAVA_CALLBACK
  }

  //First we create a new StravaStrategy. See the passport documentation (linked at the beginning of this article) for more information on what a strategy is in this context
//The stravaConfig argument below is created in the code snippet above using your clientID, clientSecret, and callbackURL
const strategy = new StravaStrategy(stravaConfig, (accessToken, refreshToken, profile, done) => {
    const stravaId = profile.id
    const name = profile.displayName
    const email = profile.emails[0].value

    db.query('SELECT uuid, username, straveEmail FROM strava_test.strava_users WHERE stravaId = $1',
    [stravaId], (err, res) => {
        if(err) {
            db.query
        }
        const user = res.rows[0];
        done(null, user)
    })

    User.find({where: {stravaId}})
      .then(foundUser => (foundUser
        ? done(null, foundUser)
        : User.create({name, email, stravaId})
          .then(createdUser => done(null, createdUser))
      ))
      .catch(done)
  })