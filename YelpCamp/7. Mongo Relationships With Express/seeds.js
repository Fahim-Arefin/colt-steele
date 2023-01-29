//here we seeds my database 
//initially empty database in annoying so we insert dummy data to start

const mongoose = require('mongoose')
const Product = require('./models/product')  //exported from product.js file

//connection with mongoose
mongoose.connect('mongodb://localhost:27017/farmStandRelationship')
    .then(() => {
        console.log('Mongo connnection successful: ')
    })
    .catch((e) => {
        console.log('Mongo connection failed !!')
        console.log(e)
    })

//insertMany
const seedProducts = [
    {
        name: 'Ruby Grapefruit',
        price: 2.5,
        category: 'fruit'
    },
    {
        name: 'Fairy Eggplant',
        price: 1.0,
        category: 'vegetable'
    },
    {
        name: 'Organic Godness Melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Organic mini seedless watermelon',
        price: 3.99,
        category: 'fruit'
    },
    {
        name: 'Organic Celery',
        price: 2.99,
        category: 'vegetable'
    },
    {
        name: 'Chocolate whole milk',
        price: 6.22,
        category: 'dairy'
    },
]
Product.insertMany(seedProducts)
    .then((data) => {
        console.log(data)
    })
    .catch(e => {
        console.log(e)
    })

//execute it using 'node seeds.js' before runnig index.js