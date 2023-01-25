/*
    --> seeding database with the help of cities.js and seedHelpers.js
    --> seedHelpers.js er help niye title create korbo 
    --> cities.js er help niye location create korbo

    --> run this file at the end to seed database
*/

//require
const mongoose = require('mongoose')
const Campground = require('../model/campground')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')

//connection with mongoose
mongoose.connect('mongodb://localhost:27017/YelpCamp') //connected to YelpCamp database
    .then(() => {
        console.log('Mongo connnection successful: ')
    })
    .catch((e) => {
        console.log('Mongo connection failed !!')
        // console.log(e)
    })

const sample = (array) => {
    return array[Math.floor(Math.random() * array.length)]
}


//seeding database
const seedDB = async () => {
    await Campground.deleteMany({})   //delete All

    //create 50 campground
    for (let i = 0; i < 50; i++) {
        let random1000 = Math.floor(Math.random() * 1000)
        let randomPrice = Math.floor(Math.random() * 30)+10
        const newCamp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            image: 'http://source.unsplash.com/collection/484351',  //API for ramdom image
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat molestias veritatis consequatur, facere voluptatum dicta nemo molestiae, perspiciatis cupiditate vero, repellendus esse voluptates labore sequi! Pariatur doloremque dolorum ipsum qui!',
            price:randomPrice
        })
        await newCamp.save()
    }
}

// seedDB()

seedDB().then(() => {             //async func can be then able bcz it returns promise 
    console.log('saved 50 camp')
    mongoose.connection.close()         //close connection
})

/*
    location --> randomly ekta city select kore location e boshabo
    title -->   randomly choose a descriptor with randomly choose place 
*/