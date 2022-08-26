const input = document.querySelector('input')
let h2 = document.querySelector('h2')
//not very helpfull
// input.addEventListener('change',()=>{
//     console.log('sad!')
// })

//very helpfull

input.addEventListener('input',()=>{
    
    if(input.value!==''){
        h2.innerText=`Welcome : ${input.value} !!`
    }else{
        h2.innerText=`Enter your Username : `
    }
    
})