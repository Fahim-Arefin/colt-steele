//validation mongoose schema

//connection part
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/shopApp')
    .then((data) => {
        console.log('Connection success !!')
        // console.log(data)
    })
    .catch((e) => {
        console.log('Connection failed !!')
        console.log(e)
    })

//schema 
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,         //this means we cant create obj without this field
        maxLength : 20          //max length of name can be 20 or will get error with default 

    },
    price: {
        type: Number,
        required: true,                       //this means we cant create obj without this field
        min: [0,'must be greater than zero']  // if price is less than zero we get error with the message provided in index 1
    },
    onsale : {
        type : Boolean,
        default : false         //if we dont set onsale property default value will apply
    },
    catagories:{
        type : [String],        //arrays of string 
        default : ['cycling']
    },
    qty:{                       //object with online & instore properties
        online:{
            type : Number,
            default : 0
        },
        instore:{
            type : Number,
            default : 0
        }
    },
    size: {
        type: String,
        enum : ['S','M','L'],        //only accept within provided array values,if size is 'XL' which is not in defined enum
                                    //we will get error.In enum we provided valid string which can be accepted 
                                    //it is worked with string and number check documentation
        default: 'M'
    }
})


const Product = mongoose.model('Product', productSchema)        //collection name = 'products'
const bike = new Product({ name: 'mountain bike', price: 221, catagories: ['hiking','safety'], qty:{online:10,instore:7}, size:'L' })   

bike.save()
    .then((data) => {
        console.log(data)
    })
    .catch((e) => {
        console.log(e)
    })


/*              notes 
-------------------------------------------------------------------------------------------------------------------------------
//mongoosejs.com --> read doc --> schema type --> all schema types >>>>> read this for full understanding

1. const bike = new Product({ name: 'mountain bike', price: 221, color:red })  --> if color property is not defined in schema
                                                                                   but we include it while inserting it will not 
                                                                                   give error but it will not added or stored in
                                                                                   database. it will be ingored 

2. this validations will work by default object creation time 
3. if we update database these validation will not work by default
4. then we have to tell explicitly that we want these validation also work with update time 
*/
