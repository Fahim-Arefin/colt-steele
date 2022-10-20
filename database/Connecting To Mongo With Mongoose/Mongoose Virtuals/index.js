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

personSchema.virtual('fullName').get(function(){        //here we define 'fullName' property as if it is in the schema
    return `${this.firstName} ${this.lastName}`
})


const Person = mongoose.model('Person',personSchema)    //collection name = 'people' how??
                                                        //Person --> person --> people (not persons)
                                                        //first lower case then makes it plural

const person = new Person({firstName:'M.A',lastName:'fahim'})

const personDetails = async function(){
    try{
        const data = await person.save()
        console.log(data)
        console.log(person.fullName)        //there is no property 'fullName' in schema but we can access 'fullName' like property
                                            //this is possible through mongoose virtuals
    }catch(e){  
        console.log('error')
        console.log(e)
    }
}
personDetails()


/*                                          notes 
--------------------------------------------------------------------------------------------------------
-- mongoose virtuals give us the ability to add property to schema that dont actually exist in schema


*/
