const math = require('./math') //js file er name dilei hobe.extension (js) likha lagbena
console.log(math) //this math is initially empty object if no export is done from required js file (math.js)
                  //we have to export a obj from required file then we can use this math obj

console.log(math.pi)
console.log(math.square(9))
console.log(math.add(21,6))

// //alternative way 
// //destruction
console.log('alternative way')
const {pi,square} = require('./math') 
console.log(pi)
console.log(square(9))

//way-02 practice
console.log(math.admin.leader)
console.log(math.list[2])
console.log(math.greeting('jahir khan'))
console.log(math.square(3))
console.log(math.companyName)

