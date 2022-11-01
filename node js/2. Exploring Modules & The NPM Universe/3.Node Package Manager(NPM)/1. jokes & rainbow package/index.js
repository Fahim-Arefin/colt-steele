const joke = require('give-me-a-joke')
const colors = require('colors')
let j
// console.log(joke)
joke.getRandomDadJoke (function(n) { //this func is documented in website where we download the package
    j=n
    console.log(n)
    console.log(n.rainbow) //.rainbow from colors package
})

const requireOtherWaysOfColors = require('colors/safe');
setTimeout(()=>{
    console.log(requireOtherWaysOfColors.red.underline(j)) 
},2000)