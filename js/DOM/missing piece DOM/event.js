//---------------------------------------------------------------------

let btn = document.querySelectorAll('button')
btn[1].onclick = () =>{
    console.log('ahhhhhhhh !!')
    console.log('you are touching me !!')
}
function out(){
    console.log('Thanx for leaving me alone :) ')
}
function scream(){
    console.log('ahhhhhhhh !!')
    console.log('you are touching me !!')
}

btn[1].onmouseout = out

//-------------------------------------------------------------------------

//use this always 

let v3 = document.querySelector('#v3')
v3.addEventListener('click',()=>{
    console.log("addEventListener Working !!")
})
v3.addEventListener('mouseout',()=>{
    console.log('mouse out working')
})
v3.addEventListener('mouseenter',scream)