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


//creating Schemas

//Product Schema
const productSchema = new mongoose.Schema({
    name:String,
    price:Number,
    season:{
        type:String,
        enum:['fall','winter','summer']
    }
}) 

//Farm schema
const farmSchema = new mongoose.Schema({
    name:String,
    city:String,
    produce: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]  //it is objectId type
                                                                    // The ref option is what tells 
                                                                    //Mongoose which model to use during population
                                                                    //ref: 'Product' here Product is mode name
})

//creating models
const Product = mongoose.model('Product',productSchema)
const Farm = mongoose.model('Farm',farmSchema)


//insert data
// Product.insertMany([
//     {
//         name:'Goddess Melon',
//         price: 4.90,
//         season:'summer'
//     },
//     {
//         name:'Red Tomatto',
//         price: 2.05,
//         season:'winter'
//     }
// ]).then(()=>{
//     console.log('inserted many')
// }).catch((e)=>{
//     console.log(e)
// })
//----------------------------------------------
// const makeFarm = async()=>{
//     const farm = new Farm({
//         name:'Full Belly Farm',
//         city:'Dhaka'
//     })
//     const product = await Product.findOne({name:'Red Tomatto'}) 
//     console.log(product)
//     farm.produce.push(product)      //looks like we saved entire product but actually we saved the objectID
//                                     //because we made the schema like that.
//                                     //in mongoose we saw full obj(print in console than it shows full obj) 
//                                     //but in mongodb shell its saved only objectID
//     const res = await farm.save()
//     console.log(res) 
// }

// makeFarm()
//-----------------------------------------

//another way of adding product
// const addProduct = async()=>{
//     const farm = await Farm.findOne({name:'Full Belly Farm'})
//     const product = await Product.findOne({name:'Goddess Melon'})
//     farm.produce.push(product)      //only objectID is stored into farm object
//     const res = await farm.save()
//     console.log(res)
// }
// addProduct()


//populated farm 
Farm.findOne({name:'Full Belly Farm'})
.populate('produce')        //'produce' key ta dhore data populate hoye jabe 
                            //populate dara objectId ta object e replace hoye show hobe but
                            //database e thik e objectID e add thakbe
                            //we just connected to model and shows the result only
.then((data)=>{
    console.log(data)
})
.catch((e)=>{
    console.log(e)
})





/*
                            One to Many
------------------------------------------------------------------------
    ## we need more than one model to demonstrate this
    ## here we only store id then based on id we populate all data
    
    ## We define Product schema,model and create
    ## Now we define farm schema,model and create
    ## mongoose --> populate (read the doc for more info)

    ## first we insertMany product
    ## then we make farm with some of this product (comment out insertMany())
    ## then we show another way of making product

    ## populate method dara query kore data retrive kora jay objectId upor base kore

    ## mongoose --> populate (read the doc)

*/