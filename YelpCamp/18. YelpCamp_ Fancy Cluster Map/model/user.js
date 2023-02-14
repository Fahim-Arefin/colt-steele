const mongooge  = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongooge.Schema({
    email:{
        type:String,
        required: true,
        unique:true
    }
    //(username,salt,hash) 3 fields are here bcz of plugin
    // hash field is the password field
})

userSchema.plugin(passportLocalMongoose)    // this will autometically add username && password field to my userSchema
                                            // Also add some functionality (methods) to userSchema that we can use

                                            // https://www.npmjs.com/package/passport-local-mongoose --> see docs

                                            // You're free to define your User how you like. passport-mocal-mongoose will 
                                            // add a username, hash and salt field to store the username,
                                            // the hashed password and the salt value.

                                            // Additionally passport-mocal-mongoose adds some methods to your Schema.
                                            // See the API Documentation section for more details.

module.exports = mongooge.model('User',userSchema)