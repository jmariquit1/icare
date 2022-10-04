const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const UserSchema = mongoose.Schema({
    username : {
        type: String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})

// pre middleware

UserSchema.pre('save', function (next) {
    const user = this

    if (this.isModified('password') || this.new) {
        bcrypt.genSalt(10, function (saltError, salt) {
            if (saltError) {
                return next(saltError)
            } else {
                bcrypt.hash(user.password, salt, function(hashError, hash) {
                    if(hashError) {
                        return next(hashError)
                    }
                    user.password = hash
                    next()
                })
            }
        })
    } else {
        return next()
    }
})

// compare password

UserSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (error, isMatch) {
        if(error) {
            return callback(error)
        } else {
            callback(null, isMatch)
        }
    })
}
module.exports = mongoose.model('User', UserSchema)