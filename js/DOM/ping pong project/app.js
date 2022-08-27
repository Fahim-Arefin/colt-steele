let winningScoreObj = document.querySelector('#setPlaying')
let playerOne = document.querySelectorAll('#btn button')[0]
let playerTwo = document.querySelectorAll('#btn button')[1]
let reset = document.querySelectorAll('#btn button')[2]
let playerOneSpan = document.querySelector('#p1span')
let playerTwoSpan = document.querySelector('#p2span')


let winningScore=5;
let playerOneScore = 0;
let playerTwoScore = 0;


winningScoreObj.addEventListener('change', () => {
    // console.log(winningScoreObj.value)
    resetValue()
    winningScore = parseInt(winningScoreObj.value)
    // console.log(winningScore)
})



playerOne.addEventListener('click', () => {

    playerOneScore++;
    playerOneSpan.innerText=playerOneScore
    if (playerOneScore === winningScore) {
        playerOneScore = 0;
        playerTwoScore=0;
        console.log(`player One won`)
        playerOneSpan.classList.add('success')
        playerTwoSpan.classList.add('loose')
        disabledButton()
    } 
})


playerTwo.addEventListener('click', () => {
    playerTwoScore++;
    playerTwoSpan.innerText=playerTwoScore
    if (playerTwoScore === winningScore) {
        playerOneScore = 0;
        playerTwoScore=0;
        console.log(`player two won`)
        playerOneSpan.classList.add('loose')
        playerTwoSpan.classList.add('success')
        disabledButton()
    } 
})

reset.addEventListener('click',()=>{
    resetValue()
    winningScoreObj.value='5'
    winningScore=5
})
function resetValue(){
    playerOneSpan.classList.remove('success')
    playerOneSpan.classList.remove('loose')
    playerTwoSpan.classList.remove('success')
    playerTwoSpan.classList.remove('loose')
    playerOneSpan.innerText='0'
    playerTwoSpan.innerText='0'
    playerOneScore=0
    playerTwoScore=0
    playerOne.classList.remove('disableColor')
    playerTwo.classList.remove('disableColor')
}
function disabledButton(){
    playerOne.classList.add('disableColor')
    playerTwo.classList.add('disableColor')
}
