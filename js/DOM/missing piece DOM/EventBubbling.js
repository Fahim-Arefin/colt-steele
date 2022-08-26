const bubbleSection = document.querySelector('#bubble')
const bubblePeragraph = document.querySelector('#bubble p')
const bubbleButton = document.querySelector('#bubble p button')

bubbleButton.addEventListener('click',()=>{
    console.log('button clicked')
})
bubblePeragraph.addEventListener('click',()=>{
    console.log('peragraph clicked')
})
bubbleSection.addEventListener('click',()=>{
    console.log('section clicked')
})

const noBubbleSection = document.querySelector('#noBubble')
const noBubbleButton= document.querySelector('#noBubble button')

noBubbleButton.addEventListener('click',(e)=>{
    console.log('color changed')
    noBubbleSection.style.backgroundColor=randColor()
    e.stopPropagation()
})

noBubbleSection.addEventListener('click',(e)=>{
    console.log('div toggled display none')

    const displayButton = document.querySelector('#display')
    displayButton.classList.remove('toggleDiv')    
    noBubbleSection.classList.add('toggleDiv')
})

//not working
// if(noBubbleSection.getAttribute('class')=='toggleDiv'){

//     noBubbleSection.addEventListener('click',(e)=>{
//         console.log('div toggled display on')
//         noBubbleSection.classList.remove('toggleDiv')
//     })
// }


//working
const displayButton = document.querySelector('#display')

displayButton.addEventListener('click',(e)=>{

    if(noBubbleSection.getAttribute('class')=='toggleDiv'){
        console.log('div toggled display on')
        noBubbleSection.classList.remove('toggleDiv')
        displayButton.classList.add('toggleDiv')
    }
})



function randColor(){
    r=Math.floor(Math.random()*255)+1
    g=Math.floor(Math.random()*255)+1
    b=Math.floor(Math.random()*255)+1
    return `rgb(${r},${g},${b})`
}