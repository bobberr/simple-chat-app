const User = require('./models/user');
var connectedUser = {};


module.exports = (io) => {
    io.on('connection', (socket) => {
        const setLogged = (logged, email) => {
            User.findOne({'local.email': email}, (err, user) => {
                if (user) {
                    user.local.logged = logged;
                    user.save((err) => {
                        if (err) {
                            console.log('err with saving user data')
                        }
                        else {
                            console.log('saved suceesfully')
                        }
                    });
                }
            });
        }
        socket.on('send username', (username) => {
            setLogged(true, username); 
            if (username in connectedUser) {
                console.log('user exists')  
                socket.emit('user has been set');              
            } else {
                connectedUser[username] = socket;
                socket.username = username;
            }
        }); 
        socket.on('send message', ({message, author}) => {
            User.findOne({'local.email': author}, (err, user) => { 
                var time = new Date;
                time = time.getHours() + ':' + (time.getMinutes() < 10 ? '0' : '') + time.getMinutes();
                socket.emit('chat message', {message, author, thumbnail: user.local.thumbnail, time});
                socket.broadcast.emit('chat message', {message, author, thumbnail: user.local.thumbnail, time});
            });
        });

        socket.on('private message', ({author, receiver, content}) => {
            if (connectedUser[receiver]) {
                User.findOne({'local.email': author}, (err, user) => { 
                    var time = new Date;
                    time = time.getHours() + ':' + (time.getMinutes() < 10 ? '0' : '') + time.getMinutes();
                    connectedUser[receiver].emit('incoming message', {content, author, thumbnail: user.local.thumbnail, time});
                    connectedUser[author].emit('incoming message', {content, author, thumbnail: user.local.thumbnail, time});
                });
                
            } else {
                console.log('current user doesnt exist in connected users table')
            }
        });
        socket.on('logout', (email) => {
            delete connectedUser[socket.username];
            setLogged(false, email);
        })
        socket.on('disconnect', () => {
            delete connectedUser[socket.username];
            console.log(connectedUser)
            console.log('disconnected');
        })
        
    });
}