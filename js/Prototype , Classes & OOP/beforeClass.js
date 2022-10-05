//-------------------------------------------------------------------------------------------
//Topic : 'object prototype'

//***remember all Array,String,Func etc are object***

const arr = [2, 4, 5]
console.log(arr);  //all array by default [[prototype]] property share kore.
//[[prototype]] is a template obj which contain functions typically
//build in shob method e eikhane thake and array create er time e
//share hoy shb array te
//there is one [[prototype]] and each array reference to it in creation time.

arr.push(10) //ei push method array te func akare declare nei.rather it is in [[prototye]]
//property which is shared by all.
console.log(arr);

//I can make my own method just like adding object property bcz array is a object
//array object e object jevabe new property add kore oivabei fuct add korte parbo

arr.fahim = 'Web Developer' //adding a property, key fahim value a string
arr.fahimPosition = () => {   //adding a property, key fahimPosition value a func
    console.log('Senior Node Js Dev')
}
console.log(arr);
console.log(arr.fahim);
arr.fahimPosition()

const arr2 = [22, 4, 1]
console.log(arr2);
// console.log(arr2.fahimPosition()); //cant use bcz its added in arr as a property
//but we can use if it was in [[prototype]] object
//below we will create a func in [[prototype]] and 
//use it with every array


//view prototype object
console.log(Array.prototype);
console.log(String.prototype);


//creating property inside [[prototype]] so that every one can use it

//example-01
String.prototype.eat = function () {      //*** arrow function cant support 'this',
    //we have to use 'function(){}' instead of '()=>{}'***

    console.log(`${this} cat is eating...`);
    console.log(this.toUpperCase()); //'this' keyword refers to which string is calling this method
}

let s = 'Persian'
let s1 = 'American mixed breed'
s.eat()
s1.eat()

//example-02
Array.prototype.sum = function () {
    return this.reduce((sum, element) => {  //'this' keyword is refers to which array is calling this method
        return sum + element
    })
}

const candyPrice = [2, 3, 5, 15, 25]
let totalPrice = candyPrice.sum()
console.log(totalPrice)


//example-03
//we can override/modify build in func which is stored in [[prototype]]
const num = [1, 2, 4]
console.log(num);
num.pop()
console.log(num);

Array.prototype.pop = function () {
    return 'sorry i m in love with my element, I cant leave them'
}

const number = [1, 2, 4]
console.log(number);
console.log(num.pop());
console.log(number);
//-----------------------------------------------------------------------------------------------------



//------------------------------------------------------------------------------------------------------
console.log('--------------------------------------------------------------');
//normal function
const redGreenBlue = (r, g, b) => {
    return `rgb(${r}, ${g}, ${b})`
}

const hexadecimel = (r, g, b) => {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

//we have to pass value everytime its so time consuming,factory function can solve this
const c1 = redGreenBlue(22, 21, 222)
const c2 = hexadecimel(22, 21, 222)
const c3 = redGreenBlue(14, 111, 211)
const c4 = hexadecimel(14, 111, 211)

console.log(c1)
console.log(c2)
console.log(c3)
console.log(c4)


//Topic: Factory FuncTion (not a great approach to create a 'pattern', not using these days,but its nice to know)
const makeColor = function (r, g, b) {
    const color = {}
    color.r = r
    color.g = g
    color.b = b
    color.rgb = function () {
        //way01
        const { r, g, b } = this //this keyword use korar time e callback use kora jayna function(){} evabe use kora lage
        return `rgb(${r}, ${g}, ${b})`
        //way02
        // return`rgb(${this.r}, ${this.g}, ${this.b},)`
    }
    color.hex = () => {
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
    }
    return color
}

//once created now just call method without parameter bcz it can use parameter from properties
const firstColor = makeColor(25, 255, 221)
const secondColor = makeColor(225, 55, 21)
console.log(firstColor.rgb())
console.log(firstColor.hex())

console.log(secondColor.rgb())
console.log(secondColor.hex())
//-----------------------------------------------------------------------------------------------------



//------------------------------------------------------------------------------------------------------
console.log('--------------------------------------------------------------');
//Topic: Constructor Function (usefull but still need improvement )


//***Drawback of Factory Function***
//in factory function functions are not in [[prototype]].they have separate copy
//prottek e alada alada vabe same func gulae tader properties e add kortese
let isReferancingSameObj = firstColor.hex() === secondColor.hex()
console.log(isReferancingSameObj) //false (not referencing same func)
console.log(firstColor)
console.log(secondColor)

//but if we compare inside [[prototype]] functions we can see one func is referencing by all.

let string1 = "fahim"
let string2 = "naim"
isReferancingSameObj = (string1.slice === string2.slice)
console.log(isReferancingSameObj) //true (referencing same func)

//now we use Constructor Function without 'new' keyword
function Colordemo(r, g, b) { //contructor func er name traditionally capital letter diye start hoy
    this.r = r
    this.g = g
    this.b = b
    console.log(this); //referce to windows
}
const c = Colordemo(22, 112, 112)
console.log(c) //undefined


//now we use Constructor Function with 'new' keyword
//new keyword description below
/*
    1.Creates a blank, plain JavaScript object. For convenience, let's call it newInstance.

    2.Points newInstance's [[Prototype]] to the constructor function's prototype property,
    if the prototype is an Object. Otherwise, newInstance stays as a plain object with Object.
    prototype as its [[Prototype]].

    3.Executes the constructor function with the given arguments, 
    binding newInstance as the this 
    context (i.e. all references to this in the constructor function now refer to newInstance).

    4.If the constructor function returns a non-primitive, 
    this return value becomes the result of the whole new expression. 
    Otherwise, if the constructor function doesn't return anything or returns a primitive,
    newInstance is returned instead. 
    (Normally constructors don't return a value, but they can choose to do so to override
    the normal object creation process.)

*/
/*
    inshort
    1.create an obj implicitly
    2.constructor set kore
    3.this keyword diye oi newly create func k refer kora jay
    4.return an obj implicitly
*/



//Construtor function
function Color(r, g, b) { //contructor func er name traditionally capital letter diye start hoy
    this.r = r
    this.g = g
    this.b = b
    // console.log(this); //referce to implicitly created obj
}


Color.prototype.rgb = function () {           //these func are created in prototype obj and can share every instance
    const { r, g, b } = this                  //this keyword use korar time e callback use kora jayna function(){} evabe use kora lage
    return `rgb(${r}, ${g}, ${b})`
}

Color.prototype.hex = function(){               //these func are created in prototype obj and can share every instance
    const { r, g, b } = this  
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

Color.prototype.rgba = function(a=1.0){
    const {r,g,b} =this
    return `rgb(${r}, ${g}, ${b}, ${a})` 
}

const color1 = new Color(22, 1, 112);
const color2 = new Color(48, 52, 2);

console.log(color1)
console.log(color2)

console.log(color1.rgb())
console.log(color1.hex())

console.log(color2.rgb())
console.log(color2.hex())

console.log(color1.hex===color2.hex) //now its true bcz both reference same hex func 

console.log(color1.rgba(.3))
console.log(color2.rgba(.8))

document.body.style.backgroundColor=color1.rgba(.5)   

//------------------------------------------------------------------------------------------------
console.log('-----------------------------------------------------')



//------------------------------------------------------------------------------------------------
//Topic: Class (we always use it from now on)
//'class.js' open this file and read 














