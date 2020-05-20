console.log("Server-side JS")

const express = require("express")
const port = 8080
const db = require("./db/config")
const pwd = require("./models/password")
const morgan = require('morgan');
const bodyParser = require('body-parser');
const petController = require('./controllers/pet');
const userController = require('./controllers/user');
const apptController = require('./controllers/appointments');
const medsController = require('./controllers/meds');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;



passport.use(new Strategy((username, password, cb) => {
    db.query(
        "select * from users where username = $1",
        [username],
        (err, dbRes) => {
          return cb(null, dbRes.rows[0])
        }
    )
}));

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});
  
passport.deserializeUser((id, cb) => {
    db.query(
        "select * from users where id = $1",
        [id],
        (err, dbRes) => {
          return cb(null, dbRes.rows[0])
        }
    )
});




const app = express()

////////// MIDDLEWARE ///////////

app.use(morgan("combined"))

app.use(bodyParser.json()) // reads params from body
app.use(bodyParser.urlencoded({extended: true})) 


app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

////////// MIDDLEWARE ///////////

app.set('view engine', 'ejs')

// app.get("/", (req,res) => { // this is to look at the user session stuff
//     res.json(req.user)
// })
app.use(express.static('public'))
app.use('/', petController)
app.use('/', userController)
app.use('/', apptController)
app.use('/', medsController)


app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/login/new', (req, res) => {
    res.render('login-new');
});

app.post('/login/new', (req, res) => {

    passwordDigest = pwd.digest(req.body.password)
    db.query(
        "INSERT INTO users (username, email, password_digest) VALUES ($1, $2, $3);",
        [req.body.username, req.body.email, passwordDigest],
        (err, dbRes) => {
            res.redirect('/login')
        }
    )
})

app.post('/login', 
    passport.authenticate(
        'local',
        { failureRedirect: '/login' }
    ),
    (req, res) => {
        res.redirect('/');
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

app.get("/pet", (req, res) => {

    let dbPets = [
        {
        id: 3,
        name: "Poochie",
        species: "dog",
        dob: "2020-05-13",
        image_url: "dog.jpg"
        },
        
        {
        id: 4,
        name: "Puss n Boots",
        species: "cat",
        dob: "2019-10-09",
        image_url: "cat.jpg"
        },
        {
        id: 6,
        name: "Smoothy",
        species: "possum",
        dob: "2018-02-28",
        image_url: "possum.jpg"
        }
    ]
    
    res.render('dashboard', { pets: dbPets })
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})