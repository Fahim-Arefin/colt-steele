let maxNumber = parseInt(prompt("enter a max number"))
while(!maxNumber){
    maxNumber = parseInt(prompt("enter a max number"))
}

let randNum = Math.floor(Math.random() * maxNumber)+1
console.log(`Random number is : ${randNum}`)
let counter=0 

let guess = parseInt(prompt("Enter first guess"))
while(parseInt(guess)!==randNum){
    if(guess==="q"){
        break;
    }
    counter++
    if(guess>randNum){
        guess = prompt("its too high")
    }else{
        guess = prompt("its too low")
    }
}
console.log(`you take ${counter} steps to guess`)