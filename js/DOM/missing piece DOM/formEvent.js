const form = document.querySelector('form')
form.addEventListener('submit',function(e){
    e.preventDefault()
    //way 01

    // let userInput=document.querySelectorAll('input')[0]  
    // let tweet=document.querySelectorAll('input')[1]
    // console.log(userInput.value," - ",tweet.value)

    //way 02
    let userInput=form.elements.username
    let tweet=form.elements.tweet

    console.log(`${userInput.value} - ${tweet.value}`)
    let node = createNode(userInput.value,tweet.value)
    let ul = document.querySelector('.result ul')
    ul.appendChild(node)
    userInput.value=""
    tweet.value=""
})

function createNode(username,tweet){
    let b = document.createElement('b')
    b.append(username)
    let li = document.createElement('li')
    li.appendChild(b)
    li.append(` - ${tweet}`)
    return li
}