// console.dir(document)
// const img1 = document.all[10].innerHTML
// console.log(img1)
// document.all[10].innerHTML='fahim'

//---------------------------------------------------------------


const image = document.getElementById('banner')
console.log(image)
// console.log(image.getAttribute('src'))
console.dir(image)

//----------------------------------------------------------------

const allImage = document.getElementsByTagName('img')
console.log(allImage)

for(let i of allImage){
    console.log(i.src)
}
console.log(allImage[3]) //can use index and loop but cant use array methods because its not array
// for(let i of allImage){
//     i.src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Partridge_Silkie_hen.jpg/900px-Partridge_Silkie_hen.jpg'
// }

allImage[2].src = allImage[0].src
const ancherTagAll = document.getElementsByTagName('a')
console.log(ancherTagAll)
// console.log(ancherTagAll[1].getAttribute('href'))



for(let link of ancherTagAll){
    console.log(link.href)
    // link.innerText='I am a link'
}


//-----------------------------------------------------------------------


const h1 = document.querySelector('h1')
console.dir(h1)
h1.innerHTML='<i>Hello Chicks</i>'

let li = document.querySelectorAll('.subLI li')
console.dir(li)

for(let i of li ){
    i.innerHTML+='<sup>edited</sup>'
}

let h2 = document.querySelector('.toctitle h2')
console.dir(h2)
h2.innerText='Content-List'

//-----------------------------------------------------------------------
let c=0;
let anchors = document.querySelectorAll('a')
console.log("before change title")
for(let anchor of anchors){
    console.log(` Title = ${anchor.getAttribute('title')}`)
}
for(let anchor of anchors){
    c++
    anchor.setAttribute('title',`Setting Title From Java-Script ${c}`)
}
console.log("After Change Title")
for(let anchor of anchors){
    console.log(` Title = ${anchor.getAttribute('title')}`)
}

//------------------------------------------------------------------------


// let headline = document.querySelector('h1')
// console.log(headline.style)
// // headline.style.backgroundColor='red'

// for(let anchor of anchors){
//     anchor.style.textDecorationStyle='wavy'
//     anchor.style.textDecorationColor='brown'
// }

// console.log(anchors[8].style.textDecorationColor) //we set it inline so we can see otherwise we will see null

// console.log(headline.style.fontSize) //cant see beacuse its not inline define and also we didnot change through js inline 
// console.log(window.getComputedStyle(headline).fontSize) //we can see what size is appiled to h1 


//--------------------------------------------------------------------------

const contentList = document.querySelector('#toc .toctitle h2')
console.dir(contentList)

// console.log(contentList.getAttribute('class'))
// console.log(contentList.getAttribute('id'))

contentList.classList.add('purple')
contentList.classList.add('border')
contentList.classList.remove('border')
console.log(contentList.classList.contains('purple'))
contentList.classList.add('border')
console.log(contentList.classList.toggle('border'))
console.log(contentList.classList.toggle('border'))
console.log(contentList.classList.toggle('border')) 

//------------------------------------------------------------------------------

let firstBold = document.querySelector('b')
console.log(firstBold)
console.log(firstBold.parentElement)
// console.log(firstBold.parentElement.parentElement)
const paragraph = firstBold.parentElement
console.log(paragraph.childElementCount)
console.log(paragraph.children)
const paraChildren = paragraph.children
for(let child of paraChildren){
    console.log(child)
}

let sqr = document.querySelector('.square')
console.log(sqr)
console.log(sqr.nextElementSibling)
console.log(sqr.previousElementSibling)


const toc = document.querySelector('#toc')
console.log(toc)
console.log(toc.childElementCount)
console.log(toc.children)
console.log(toc.children[2].previousElementSibling)


//--------------------------------------------------------------------------------

const newImage = document.createElement('img')
console.log(newImage)
newImage.src='https://www.hepper.com/wp-content/uploads/2021/11/bichon-frise_Vladimir-Nenezic_shutterstock-scaled-1.jpg'
document.body.appendChild(newImage)
newImage.classList.add('square')

let newHeading = document.createElement('h2')
newHeading.innerText='I M New Heading'
document.body.appendChild(newHeading)

const firstPeragraph = document.querySelector('p')
firstPeragraph.append('hello',' world')

const bold = document.createElement('b')
// bold.innerText='Prepend me!!! ' 
// or
bold.append('Prepend me !!! ')
firstPeragraph.prepend(bold)


newHeading = document.createElement('h2')
newHeading.append('Are very sweet')

target = document.querySelector('h1')
target.insertAdjacentElement('afterend',newHeading) //this func add sibling level append/appendChild/prepend works with child

//------------------------------------------------------------------------------------


let removeLastLI = document.querySelector('#toc ul li:nth-of-type(5)')
console.log(removeLastLI)
removeLastLI.remove()

//------------------------------------------------------------------------------------





