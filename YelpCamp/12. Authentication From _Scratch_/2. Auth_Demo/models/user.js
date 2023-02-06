const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:[true,'userName cant be empty']
    },
    password:{
        type:String,
        require:[true,'password cant be empty']
    }
})

const User = mongoose.model('User',userSchema)

module.exports = User