const io = require('socket.io-client')  
const socket = io.connect('https://social-diplom.herokuapp.com');

export default socket;