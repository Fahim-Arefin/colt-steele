let btn = document.querySelector('.heading button')
console.log(btn)

btn.addEventListener('click',()=>{

   
    r = Math.floor(Math.random()*255)+1
    g = Math.floor(Math.random()*255)+1
    b = Math.floor(Math.random()*255)+1
    let h2
    if(document.querySelectorAll('.heading h2').length==0){
        h2 = document.createElement('h2')
        h2.innerText=`rgb(${r},${g},${b})`
    }else{
        h2 = document.querySelector('h2')
        h2.remove()
        h2 = document.createElement('h2')
        h2.innerText=`rgb(${r},${g},${b})`
    }   
   

    let h1 = document.querySelector('.heading h1')
    h1.insertAdjacentElement('afterend',h2)

    document.body.style.backgroundColor=`rgb(${r},${g},${b})`
    
})