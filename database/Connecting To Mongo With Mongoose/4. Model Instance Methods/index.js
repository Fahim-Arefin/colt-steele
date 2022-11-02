
//in this section we will define our custom 'instance method'

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


//instance method
productSchema.methods.greet = function(){       //here greet is a instance method which will be available to every instance
    console.log('helloo')
    console.log(`from - ${this.name}`)
}

//instance method
productSchema.methods.toggleOnsale = function(){
    this.onsale = !this.onsale          //toogle boolean value true to false and vice versa
    return this.save()  //save return promises so it take time to resolve, we need to wait for it 
                        //save() return promise then again we return it from here.
                        //ultimately we have to await it somewhere
}

productSchema.methods.addCategory = function(newCategory){
    this.catagories.push(newCategory)
    return this.save()
}







const Product = mongoose.model('Product', productSchema)        

// const bike = new Product({name:'single-seat',price:70.33})
// bike.save()
// bike.greet()

const findProduct = async ()=>{
    try{
        const foundProduct = await Product.findOne({name:'road-bike'})  //findOne return promisses
        foundProduct.greet()
    }catch(e){
        console.log('could not found')
        // console.log(e)
    }
}
findProduct()


const toggleOnsaleAndaddCategory = async ()=>{
    try{
        const foundProduct = await Product.findOne({name:'road-bike'})  //findOne return promisses
        console.log(foundProduct)
        await foundProduct.toggleOnsale()
        console.log(foundProduct)
        await foundProduct.addCategory('tour-bike')
        console.log(foundProduct)
    }catch(e){
        console.log('could not found')
        // console.log(e)
    }
}
toggleOnsaleAndaddCategory()


/*              notes 
-------------------------------------------------------------------------------------------------------------------------------
instance methods is used by every instance.   ---> 'new Product(....).save()'  ---> save() is a instance method 
instance methods is used by only class.       ---> 'Product.find()'  -->  find() is a satic/class  method


--create instance method like below way--
schemaName.methods.functionName = function(){       
    inside here 'this' refers to instance/obj
}

*/
