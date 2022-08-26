let buttons = document.querySelectorAll('button')
for(let button of buttons){
    button.addEventListener('click',colorized)
}

function colorized(){
    this.style.backgroundColor=randColor()
    this.style.color='white'
    this.innerText='Clicked'
}

function randColor(){
    r=Math.floor(Math.random()*255)+1
    g=Math.floor(Math.random()*255)+1
    b=Math.floor(Math.random()*255)+1
    return `rgb(${r},${g},${b})`
}