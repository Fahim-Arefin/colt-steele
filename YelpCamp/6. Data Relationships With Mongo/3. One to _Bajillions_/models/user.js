const mongoose = require('mongoose')
mongoose.set('strictQuery', false); //console e warning show kortesilo tai ei line add kora hoise


//connecting wth mongoose
mongoose.connect('mongodb://localhost:27017/relationshipDemo', { useNewUrlParser: true })
    .then((data) => {
        console.log('Connection success !!')
        // console.log(data)
    })
    .catch((e) => {
        console.log('Connection failed !!')
        console.log(e)
    })


//defining schema
const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    addresses: [
        {
            // _id: { id: false },      if we do not want id here we can set it as false
            street: String,
            city: String,
            state: String,
            country: String,
        }
    ]
})

//creating model based on schema
const User = mongoose.model('User', userSchema)

// //creating a user func
// const makeUser = async ()=>{
//     const u = new User({
//         first:'harry',
//         last:'porter',
//         addresses:[
//             {
//                 street:'123 st california',
//                 city:'california',
//                 street:'54 cascade',
//                 country:'New York',
//             }
//         ]
//     })
//     const res = await u.save()
//     console.log(res)
// }



const makeUser = async () => {
    const u = new User({
        first: 'harry',
        last: 'porter',
    })

    u.addresses.push(       //we first created u object then pushed adresses
        {
            street: '22',
            city: 'dhaka',
            street: '54 cascade',
            country: 'Bangladesh',
        },
        {
            street: '32',
            city: 'dhaka',
            street: 'goran chapra moshjid',
            country: 'Bangladesh',
        }
    )
    const res = await u.save()
    console.log(res)
}

const addAddress = async (id)=>{
    const user = await User.findById(id)
    user.addresses.push(
        {
            street: '466',
            city: 'dhaka',
            street: 'east madartek',
            country: 'Bangladesh',
        }
    )
    let res = await user.save() 
    console.log(res)
}

// makeUser()
//     .then(() => {
//         console.log('created successfully')
//     })
//     .catch((e) => {
//         console.log(e)
//     })
addAddress('63d249095df46f8cf3edb634')      //copied from mongodb id



/*
                            One to Few
------------------------------------------------------------------------
    ## npm init
    ## install npm i express mongoose 
    ## make models directory and a user.js file inside
    ## In One to Few relationship "we embeded the data directly into the document"
    ## See slide for clear understanding
    ## we connect to mongoose,create a schema,a model and make a user
    ## One to few relationship is used because user have some address not too many.
       thats why we directly stored it as a Arrays of Object format
       addresses:[
        {

        },
        {

        }
       ]
    ## Now we can notice that every user have id which is okay but inside every user
       every address has its own id
    ## now we can turn it off if we add  '_id:{id:false}' to schema 
       but we sometimes need these 

    ## we first make a user
    ## then we push addresses with a func 
    ## this is the best way to do it


*/