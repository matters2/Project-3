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
// const passport = require('passport');
// const Strategy = require('passport-local').Strategy;



// passport.use(new Strategy((username, password, cb) => {
//       callbensfucntionforuser(username, (err, user) => {
//         if (!user) { return cb(null, false); }
//         if (user.password != password) { return cb(null, false); }
//         return cb(null, user);
//       });
// }));

// passport.serializeUser(function(user, cb) {
//     cb(null, user.id);
// });
  
// passport.deserializeUser((id, cb) => {
//     db.users.findById(id, function (err, user) {
//         if (err) { return cb(err); }
//         cb(null, user);
//     });
// });




const app = express()

////////// MIDDLEWARE ///////////

app.use(morgan("combined"))

app.use(bodyParser.json()) // reads params from body

app.use(express.static('public'))

// app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// app.use(passport.initialize());
// app.use(passport.session());

////////// MIDDLEWARE ///////////

app.use('/', petController)
app.use('/', userController)
app.use('/', apptController)
app.use('/', medsController)

app.get("/", (req,res) => {
    res.send("hello world")
})

// app.get('/login', (req, res) => {
//     res.render('login');
// });

// app.post('/login', 
//     passport.authenticate('local', { failureRedirect: '/login' }),
//     function(req, res) {
//         res.redirect('/');
//     });

// app.get('/logout', (req, res) => {
//     req.logout();
//     res.redirect('/');
//   });






// app.get("/pet", (req, res) => {
//     ​
//     // let dbPets = [
//     //     {
//     //     name: "Poochie",
//     //     species: "dog",
//     //     dob: "2020-05-13",
//     //     image_url: "dog.jpg"
//     //     },
//     //     {
//     //     name: "Puss n Boots",
//     //     species: "cat",
//     //     dob: "2019-10-09",
//     //     image_url: "cat.jpg"
//     //     },
//     //     {
//     //     name: "Smoothy",
//     //     species: "possum",
//     //     dob: "2018-02-28",
//     //     image_url: "possum.jpg"
//     //     }
//     // ]
//     ​
//     ​
//     ​
//     // res.render('dashboard', { pets: dbPets })
// }) 



app.listen(port, () => {
    console.log(`listening on port ${port}`)
})