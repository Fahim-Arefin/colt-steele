
//in this section we will define our custom 'satic method'

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
        maxLength: 20

    },
    price: {
        type: Number,
        required: true,
        min: [0, 'must be greater than zero']
    },
    onsale: {
        type: Boolean,
        default: false
    },
    catagories: {
        type: [String],
        default: ['cycling']
    },
    qty: {
        online: {
            type: Number,
            default: 0
        },
        instore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L'],
        default: 'M'
    }
})

productSchema.statics.fireSale = async function () {
    try {
        await this.updateMany({}, { onsale: true, price: 0 })        //update all 
                                                                     //this refers to Product class/model 
        //or
        //Product.updateMany({},{onsale:true,price:0})
    } catch (e) {
        console.log('error')
    }

}

const Product = mongoose.model('Product', productSchema)
Product.fireSale()






/*              notes 
-------------------------------------------------------------------------------------------------------------------------------
instance methods is used by every instance.   ---> 'new Product(....).save()'  ---> save() is a instance method 
instance methods is used by only class.       ---> 'Product.find()'  -->  find() is a satic/class  method


--create instance method like below way--
schemaName.methods.functionName = function(){       
    inside here 'this' refers to instance/obj
}

--create satic method like below way--
schemaName.statics.functionName = function(){       
    inside here 'this' refers to Class
}

*/
