//Mongoose virtuals

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/personInfo')
    .then((data) => {
        console.log('Connection success !!')
        // console.log(data)
    })
    .catch((e) => {
        console.log('Connection failed !!')
        console.log(e)
    })

const personSchema = new mongoose.Schema({
    firstName : String,
    lastName : String
})

personSchema.virtual('fullName').get(function(){        
    return `${this.firstName} ${this.lastName}`
})


/*
    Here pre is activate before save() function is called 
    now person fullName = sagor mutsia 
    then pre activates and it override fullName 
    then save() function is called 
    now it saves with override info 
*/
personSchema.pre('save', async function(){    //use async func, runs before save() is called 
                                              //first parameter is the method name which before pre is activate
    this.firstName = 'I M'
    this.lastName = 'Hacker'
    console.log('about to save...')
})

personSchema.post('save', async function(){     //use async func, runs after save() is called
                                                //first parameter is the method name which after post is activate
    console.log('just saved !!')
})

const Person = mongoose.model('Person',personSchema)    

const person = new Person({firstName:'sagor',lastName:'mutsia'})

person.save()
.then((data)=>{
    console.log(data.fullName)
})
.catch((e)=>{
    console.log(e)
})

/*                                          notes 
--------------------------------------------------------------------------------------------------------
-- mongoose gives us the ability to run code before and after certain mongoose method are called 
   through mongoose middleware  (.pre & .post)

-- above exaple is very silly but middleware is very usefull 
-- suppose we are working with review mode so whenever a new review is created we want to keep the avarage review rates
-- so we can easily do it by post middleware. after save() review in database post is activated and there we can 
   calculate avarage review 



*/
