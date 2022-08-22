const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// for(let a of array){
//     console.log("number : "+a)
// }
array.forEach(function (num) {
    console.log(`number = ${num} and squre = ${num * num}`)
})

//----------------------------------------------------------------------------


const obj = {
    name: "fahim",
    info: ["181238", "UIU", 56],
    address: {
        currentAdd: "456 east goran",
        permanentAdd: "chandpur"
    },
    favMovies: [{ title: 'interstellar ', year: 2013 }, { title: 'inception', year: 2017 }]
}
console.log(obj.name)
obj.info.forEach(function (n) {
    console.log(`array : ${n}`);
})
console.log(obj.address.currentAdd)
console.log(obj.address.permanentAdd)
obj.favMovies.forEach(function (n) {
    console.log(`title = ${n.title} && year = ${n.year}`)
})
// for(let n of obj.favMovies){
//     console.log(`${n.title} - ${n.year}/100`)
// }

//------------------------------------------------------------------------------------------

const movies = [{ title: 'Lord of the ring', rating: "9.4" }, { title: 'inception', rating: "9.2" }, { title: 'tenet', rating: "8.4" }, { title: 'interstellar', rating: "8.7" }]
console.log("Original Array ")
for (let mov of movies) {
    console.log(`Movie name : ${mov.title} - rating : ${mov.rating}/10`)
}
const titleArray = movies.map(function (n) {
    return n.title
})
for (let mov of titleArray) {
    console.log(`Movie name : ${mov}`)
}
console.log(movies)
console.log(titleArray)


// DO NOT ALTER THE FOLLOWING CODE:
const fullNames = [{ first: 'Albus', last: 'Dumbledore' }, { first: 'Harry', last: 'Potter' }, { first: 'Hermione', last: 'Granger' }, { first: 'Ron', last: 'Weasley' }, { first: 'Rubeus', last: 'Hagrid' }, { first: 'Minerva', last: 'McGonagall' }, { first: 'Severus', last: 'Snape' }];

// Write your code here
console.log(fullNames)
// let firstName = fullNames.map(function(n){
//     return n.first
// })

let firstName = fullNames.map(n => n.first)

console.log(firstName)

//--------------------------------------------------------------------------------------------

// let greet = function(name){
//     console.log(`hello ${name}!!`)
// }

let greet = (name) => {
    console.log(`hello ${name}!!`)
}
greet("fahim")
greet("naim")


//---------------------------------------------------------------------------------------------------

console.log("hello")
setTimeout(() => {
    console.log("Are you still there .....???")
}, 6000)

console.log("below setTimeout code running will be not deyaled only inside portion is delayed ")           


// let id = setInterval(()=>{
//     console.log("i m interval !")
// },3000)

// clearInterval(id) -->>> this is the stopping criteria 

//-------------------------------------------------------------------------------------------------------

let books = [
    {
        name : 'the hunger games',
        rating : 4.32,
        year : '2008'
    },
    {
        name : 'harry porter',
        rating : 4.92,
        year : '1997'
    },
    {
        name : 'city of bones',
        rating : 4.08,
        year : '1990'
    },
    {
        name : 'little woman',
        rating : 3.92,
        year : '2009'
    },
    {
        name : 'lolita',
        rating : 3.22,
        year : '2020'
    },
    {
        name : 'tenet',
        rating : 4.02,
        year : '1909'
    }
];
let c=0;
books.forEach(n=>{
    console.log(`book number : ${++c}`)
    console.log(`name = ${n.name}`)
    console.log(`rating = ${n.rating}`)
    console.log(`year = ${n.year}`)
})
// let ignoreYear = books.map(({name,rating})=>{
//     return {name,rating}
// })
let ignoreYear = books.map(({name,rating})=>{
    return `${name} is rated ${rating}`
})



console.log(ignoreYear)

//filter below 20s book and print bookname only 



let filterYear = books.filter(n=> n.year>2000)
let bookname=filterYear.map(n=>n.name)

//shorthand
// let bookname = books.filter(n=> n.year>2000).map(n=>n.name)

console.log(bookname)

let validUserNames  = ['mark', 'staceysmom1978', 'q29832128238983', 'carrie98', 'MoanaFan']
let lengthFilter = validUserNames.filter(n=> n.length<10) 
console.log(lengthFilter)


//-----------------------------------------------------------------------------------


function allEven(arr){
    return arr.every( n =>{
        return n%2==0
    })
}

let a = [2,4,6]
console.log(allEven(a))

//-----------------------------------------------------------------------------------

const evenNumbers = [2,4,12,54,4,6,44]

let sum = evenNumbers.reduce((sum,value)=>{
    return sum+value;
})
console.log(`sum of the value = ${sum}`)

sum = evenNumbers.reduce((sum,value)=>{
    return sum+value;
},1000)

console.log(`sum+1000 = ${sum}`)

let max = evenNumbers.reduce((max,value)=>{
    if(max<value){
        return value
    }else{
        return max
    }
})
console.log(max)


let topRatedMovie = books.reduce((best,value)=>{
    if(best.rating>value.rating){
        return best
    }else{
        return value
    }
})
console.log(topRatedMovie)

