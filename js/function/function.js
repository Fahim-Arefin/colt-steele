//------------------------------------------------------
let square = function (num){
    return num * num;
}

function callTenTimes(func){
    for(let i=0;i<10;i++){
        const rand = Math.floor(Math.random()*10)+1;
        console.log(`random num = ${rand}`)
        console.log(`Number = ${func(rand)}`);
    }
}
// callTenTimes(square)

//--------------------------------------------------------

function factoryFunc(num1,num2){
    return function(number){
        return number>=num1 && number<=num2;
    }
}
// const isChild = factoryFunc(1,18);
// console.log(isChild(18));
// console.log(isChild(8));

//-----------------------------------------------------


const _square = {
    area : function(num){
        return num*num;
    },

    //shorthand

    // area(num){  
    //     return num*num;
    // },
    perimeter : function(num){
        return num*4;
    }  
}
// console.log(_square.area(10));
// console.log(_square.perimeter(10));

//----------------------------------------------------

let hen ={
    name : "Helen",
    eggCount : 0,
    layAnEgg : function(){
        this.eggCount++;
        return "Egg";
    }
}
console.log(hen.name) // "Helen"
console.log(hen.eggCount) // 0
console.log(hen.layAnEgg()) // "EGG"
console.log(hen.layAnEgg())// "EGG"
console.log(hen.eggCount) // 2

//----------------------------------------------------