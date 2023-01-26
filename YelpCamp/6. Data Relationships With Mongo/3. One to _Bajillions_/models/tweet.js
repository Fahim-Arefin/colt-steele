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


//creating schemas

//user Schema
const userSchema = new mongoose.Schema({
    name: String,
    age: Number
})

//Tweet Schema
const tweetSchema = new mongoose.Schema({
    text: String,
    like: Number,
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TweetUser' }]
})


//Models
const TweetUser = mongoose.model('TweetUser', userSchema)
const Tweet = mongoose.model('Tweet', tweetSchema)


// const makeTweet = async()=>{
//     const user = new TweetUser({name:'Fahim',age:25})
//     const tweet1 = new Tweet({text:'Good weather!',like:202})
//     const tweet2 = new Tweet({text:'Not so funny!',like:1052})

//     tweet1.user = user  //looks like we stored full user obj but we only store objectID
//     tweet2.user = user  //looks like we stored full user obj but we only store objectID

//     await user.save()
//     await tweet1.save()
//     await tweet2.save()
// }

// makeTweet()


const findTweet = async () => {
    try {
        const t = await Tweet.findOne({}).populate('user')  //find the firstOne only
        console.log(t)
    }catch(e){
        console.log(e)
    }
}

const findTweetWithOnlyUserName = async () => {
    try {
        const t = await Tweet.findOne({}).populate('user','name')  //find the firstOne only 
                                                                   //populate('user','name')
                                                                   //second parameter is used if we want only 
                                                                   //certain field to show and dont need the full object 
                                                                   //we can only see those field which is passed 
                                                                   //as a second parameter 
        console.log(t)
    }catch(e){
        console.log(e)
    }
}

findTweet()
findTweetWithOnlyUserName()


/*
                            One to bajillions
------------------------------------------------------------------------
    ## see slides for vizualization
    ## we take a parent referance in clild object 

*/