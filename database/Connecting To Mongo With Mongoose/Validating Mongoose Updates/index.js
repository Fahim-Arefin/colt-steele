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


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,        
        maxLength : 20         

    },
    price: {
        type: Number,
        required: true,                       
        min: [0,'must be greater than zero']  
    },
    onsale : {
        type : Boolean,
        default : false         
    },
    catagories:{
        type : [String],        
        default : ['cycling']
    },
    qty:{                      
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
        enum : ['S','M','L'],        
        default: 'M'
    }
})


const Product = mongoose.model('Product', productSchema)        
// const bike = new Product({ name: 'mountain bike', price: 221, catagories: ['hiking','safety'], qty:{online:10,instore:7}, size:'L' })   

// bike.save()
//     .then((data) => {
//         console.log(data)
//     })
//     .catch((e) => {
//         console.log(e)
//     })


// Product.findOneAndUpdate({name: 'mountain bike'},{price:-30.50},{new:true})     //this will update price by negative value  
//                                                                                 //it ingore all validation we specify 
//     .then((data) => {
//         console.log(data)
//     })
//     .catch((e) => {
//         console.log(e)
//     })


Product.findOneAndUpdate({name: 'mountain bike'},{price: -120.50},{new:true , runValidators:true})      
    .then((data) => {
        console.log(data)
    })
    .catch((e) => {
        console.log(e)
    })


/*              notes 
-------------------------------------------------------------------------------------------------------------------------------
//mongoosejs.com --> read doc --> Api --> models --> findOneAndUpdate() >>>>> read this for full understanding

1. const bike = new Product({ name: 'mountain bike', price: 221, color:red })  --> if color property is not defined in schema
                                                                                   but we include it while inserting it will not 
                                                                                   give error but it will not added or stored in
                                                                                   database. it will be ingored 

2. this validations will work by default object creation time 
3. if we update database these validation will not work by default
4. then we have to tell explicitly that we want these validation also work with update time 

new:true --> this will show the updated obj in bash , if we dont add it as true we will not see update info in bash
             then we have to check it by finding it
runValidators:true  --> we have to set runValidators property true for working the validation
                        which we defined creation time when we update something

*/
