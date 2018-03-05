//@ts-check

const bcrypt = require('bcrypt-nodejs');
const User = require('./models/user');
const jwtsecret = require('./configs/jwt').config.jwtsecret;
const jwt = require('jsonwebtoken');
const auth = require('./configs/passport')();
const passport = require('passport');


module.exports = (app, io) => {
    app.post('/sign-up', (req, res) => {
        const {email, password} = req.body;
        if (!email && !password) res.json({message: 'provideData'})
        User.findOne({ 'local.email': email }, (err, user) => {
            if (err) console.log('error while searching for registred user')
            if (user) res.json({message: 'Email in use'})
            else {
                var newUser = new User();
                newUser.local.email = email;
                newUser.local.password = newUser.generateHash(password);
                newUser.local.logged = false;
                newUser.local.location = 'Not specified',
                newUser.local.team = 'Not specified'
                io.emit('changed user data');
                newUser.save(function(err) {
                    if (err) throw err;
                    res.json({success: true})
                });
            }
        });    
    });

    

    app.post('/log-in', (req, res) => {
        const {email, password} = req.body;
        User.findOne({'local.email': email}, (err, user) => {
            if (err) throw (err);
            if (!user) {
                res.json({message: 'userNotFound'});
            } else {
                bcrypt.compare(password, user.local.password, (err, valid) => {
                    if (!valid) {
                        res.json({message: 'wrongPassword'});
                    } else {
                        user.local.logged = true;
                        io.emit('changed user data');
                        user.save((err) => {
                            if (err) throw (err);
                            const token = jwt.sign({email: user.local.email}, jwtsecret);
                            res.json({token, user, message: 'loggedSuccessfully'});    
                        });
                    } 
                }); 
            }
        });
    });

    app.use((req, res, next) => {
            auth.authenticate(req, res, next);
        }
    );
    
    app.post('/profile', (req, res) => {
        const {user} = req.body;
        User.findOne({'local.email': user}, (err, user) => {
            if (err) console.log('Error with searching of the user');
            user.local.logged = false;
            user.save((err) => {
                if (err) console.log('Error while saving user');
                res.json({success: true});
            });
        });
    });
    
    app.get('/profile', (req, res) => {
        res.json({message: 'this is hidden page'})
    });

    app.get('/users', (req, res) => {
        console.log('user is required')
        const {user} = req.headers;
        User.find({'local.email': {$ne: user}}, (err, foundUsers) => {
            res.json({allUsers: foundUsers});
        });
    });

    app.post('/photo', (req, res) => {
        const {user, url} = req.body;
        User.findOne({'local.email': user}, (err, user) => {
            user.local.thumbnail = url;
            io.emit('changed photo');
            user.save((err) => {
                if (err) console.log('Error with saving photo');
                res.json({user});
            });
        });
    });

    app.post('/userdata', (req, res) => {
        const {name, lastName, position, team, location, status, email} = req.body;
        User.findOne({'local.email': email}, (err, user) => {
                const foundUser = user.local;
                foundUser.name = name;
                foundUser.lastName = lastName;
                foundUser.position = position;
                foundUser.team = team; 
                foundUser.location = location;
                foundUser.status = status;
                io.emit('changed user data');
                foundUser.save((err) => {
                    if (err) console.log('Error with saving photo');
                    res.json({user});
                });
        });
    });

    app.get('/get-user', (req, res) => {
        console.log('user is required 2 ')
        const {email} = req.headers;
        User.findOne({'local.email': email}, (err, user) => {
            res.json({user});
        });
    });

    app.post('/delete-user', (req, res) => {
        const {email} = req.body;
        io.emit('changed user data');
        User.findOneAndRemove({'local.email': email}, () => {
            res.json({success: true});
        })
    });
}