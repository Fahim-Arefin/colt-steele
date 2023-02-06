const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'userName cant be empty']
    },
    password:{
        type:String,
        required:[true,'password cant be empty']
    }
})

const User = mongoose.model('User',userSchema)

userSchema.static.

module.exports = User