const viewAllCats = require('../catShelter') //only provide derictory name,
                                             // then require will find index.js file and 
                                             //catch what is exporting from index.js file


console.log('required an entire directory')
console.log(viewAllCats)
