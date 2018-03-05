const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
    local: {
        email: String,
        password: String,
        thumbnail: String,
        status: String,
        name: String,
        lastName: String,
        logged: Boolean,
        position: String,
        location: String,
        team: String
    }
});

userSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

module.exports = mongoose.model('User', userSchema);