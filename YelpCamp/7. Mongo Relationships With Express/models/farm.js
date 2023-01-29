//define a Product model
const mongoose = require('mongoose')
const Product = require('./product')

const farmShecma = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Fram must have a name']
    },
    city: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Email required']
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]

})

//Mongoose Middleware
//post
farmShecma.post('findOneAndDelete',async function(farm){    //In mongoose 5.x, instead of calling next() manually, you can use a
                                                            //function that returns a promise. In particular, you can use async/await.
                                                            //so we do not need to call next() in mongoose middleware
                                                            //findOneAndDelete will activated when findByIdAndDelete() is called
                                                            //parameter farm holds the deleted obj
    if(farm.products.length){   //checking if any products is exist or not

        const res = await Product.deleteMany({_id:{$in: farm.products}})    //products er moddhe jar id ei deleted farm.products
                                                                            // id er shathe match hobe oishb products gula delete
                                                                            // hoye jabe
        console.log(res)
    }

})

const Farm = mongoose.model('Farm', farmShecma)
module.exports = Farm

//Each farm has multile products ObjectID (clild)
