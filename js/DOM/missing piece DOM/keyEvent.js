let input = document.querySelector('input')
// input.addEventListener('keydown',function(event){
//     console.log(event)
//     console.log(event.key)
//     console.log(event.code)
// })

input.addEventListener('keydown',selectOnly)

function selectOnly(e){
    if(e.key=='ArrowUp'){
        console.log('Up')
    }else if(e.key=='ArrowDown'){
        console.log('Down')
    }else if(e.key=='ArrowRight'){
        console.log('Right')
    }else if(e.key=='ArrowLeft'){
        console.log('Left')
    }else{
        console.log('ignored!')
    }
}