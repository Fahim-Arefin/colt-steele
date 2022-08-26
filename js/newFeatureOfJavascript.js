function greet(person, message = "hello") { //default param should be declared last
    return `${message}, ${person} !!! `
}

function multiplication(a = 0, b = 1) {
    // if(a===0){
    //     return "enter number as peramiter please !"
    // }else{
    //     return a*b;
    // }
    return a * b
}

console.log(greet("Fahim", "welcome to js world"))
console.log(greet("Fahim"))
console.log(multiplication())
console.log(multiplication(2, 4))
console.log(multiplication(2))

//-----------------------------------------------------------------------------------

let max = Math.max(1, 22, 23, 44, 111, 4, 2, 0, 2, -54)
console.log(`Maximum = ${max}`)

const number = [1, 22, 23, 44, 111, 4, 2, 0, 2, -54]

// console.log(`Maximum = ${Math.max(number)}`) does not work need to use spread 

console.log(`Maximum = ${Math.max(...number)}`) // using spread

//---------------------------------------------------------------------------------------

const odd = [1,3,5,7,9]
const even = [2,4,6,8,10]
const string = "Fahim Arefin"
const obj = {
    name : 'fahim',
    id : '011181238',
    year : "2018"
}

const copyOfOdd=[...odd]
console.log(copyOfOdd)

const oddEven = [...odd,...even]
console.log(oddEven)

const oddEvenWithOtherNumber = ['stating',0,...odd,...even,11,12,13,'hi',14,15,'ending']
console.log(oddEvenWithOtherNumber)

const stringArray = [...string]
console.log(stringArray)



// const objArray = [...obj]  //cant convert object to array
// console.log(objArray)

//------------------------------------------------------------------------------------------




const movies ={
    Movie_name : 'inception',
    Movie_releaseDate : '1999'
}
const books ={
    name : 'zotopia',
    releaseDate : '2009'
}

const bookAndMovies ={...movies,...books,rating:7} 
console.log(bookAndMovies)

let sampleArray = [1,2,3,4,5,6,7,8,9]
let objArray={...sampleArray}
console.log(objArray)

//------------------------------------------------------------------------------------------


function sum(...num){
    return num.reduce((total,value)=>{
        return total+value
    })
}
console.log(sum(1,2,3))
console.log(sum(1,2,8))
console.log(sum(8))
console.log(sum(8,8,2,6,3))
let arrayofNumber=[8,8,2,6,5,3]

let a = sum(...arrayofNumber)
console.log(a)

function raceList(gold,silver,...restOfthePerticipant){
    console.log(`Gold medel goes to - ${gold}`);
    console.log(`Silver medel goes to - ${silver}`);
    console.log(`Thanx Everyone for perticipate to race - ${restOfthePerticipant}`);
}

raceList('Fahim','tanjim','hasin','sagor','abir','hridoy')


//------------------------------------------------------------------------------------------


const list =['Fahim','tanjim','hasin','sagor','abir','hridoy']
let [gold,silver,...rest] = list
console.log(`Gold medel goes to - ${gold}`);
console.log(`Silver medel goes to - ${silver}`);
console.log(`Thanx Everyone for perticipate to race - ${rest}`);



//------------------------------------------------------------------------------------------



