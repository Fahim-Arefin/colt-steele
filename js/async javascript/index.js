// console.log('I print first')
// setTimeout(()=>{
//     console.log('I print after 5 second')
// },5000)
// console.log('I print last')

//--------------------------------------------------------------------------------


//task is to print red,orange,yellow,green,blue in one second interval

//***when revisit uncomment each try at a time and run to see***

//============================================================
//try-01
/*
    not going to work yellow will override red and orange
*/
// document.body.style.backgroundColor='red'
// document.body.style.backgroundColor='orange'
// document.body.style.backgroundColor='yellow'

//=============================================================

//=============================================================
//try-02
/*
    after one second backgroundColor will be set yellow again (ovverride red and orange)
*/
// setTimeout(()=>{
//     document.body.style.backgroundColor='red'
// },1000)
// setTimeout(()=>{
//     document.body.style.backgroundColor='orange'
// },1000)
// setTimeout(()=>{
//     document.body.style.backgroundColor='yellow'
// },1000)

//==============================================================


//=============================================================
//try-03
/*
    this will do the job.but i have to calculate 'delay' each time.manually add 1sec each time  
*/
// setTimeout(()=>{
//     document.body.style.backgroundColor='red'
// },1000)
// setTimeout(()=>{
//     document.body.style.backgroundColor='orange'
// },2000)
// setTimeout(()=>{
//     document.body.style.backgroundColor='yellow'
// },3000)

//==============================================================
//try-04
/*
    finally we will do the job without calculating myself any delay
    nested is very common and so usefull
*/
// setTimeout(()=>{
//     document.body.style.backgroundColor='red'
//     setTimeout(()=>{
//         document.body.style.backgroundColor='orange'
//         setTimeout(()=>{
//             document.body.style.backgroundColor='yellow'
//             setTimeout(()=>{
//                 document.body.style.backgroundColor='green'
//                 setTimeout(()=>{
//                     document.body.style.backgroundColor='blue'
//                 },1000)
//             },1000)
//         },1000)
//     },1000)
// },1000)
//==============================================================


//==============================================================
//try-05
/*
    we use function to resuse code 
    this will be finally usefull and we do that very often
*/
// const delayedColorChange =(newColor,delay,doNext)=>{
//     setTimeout(()=>{
//         document.body.style.backgroundColor=newColor
//         doNext()
//     },delay)
// }

// delayedColorChange('red',1000,()=>{
//     delayedColorChange('orange',1000,()=>{
//         delayedColorChange('yellow',1000,()=>{
//             delayedColorChange('green',1000,()=>{
//                 delayedColorChange('blue',1000,()=>{

//                 })
//             })
//         })
//     })
// })

//==============================================================


//callback is hell when things getting nested 
//example :

// sendMovieAPI('interstellar',()=>{
//     saveToDB(movies,()=>{
//         //if it works, run this
//     },()=>{
//         //if doesnot work do this
//     })
// },()=>{
//     //if API is down, or request failed
// })

//so we get confused in callbacks so new version added 'promises' to get our life easier

//----------------------------------------------------------------------------------------


//creating fake API's

//===============================================================================
//try-01:using nested callback func

// const fakeCallBackRequest = (url, success, failure) => {
//     let delay = Math.floor(Math.random() * 4500) + 500;
//     setTimeout(() => {
//         if (delay > 4000) {
//             console.log(`time taken = ${delay} seconds`)
//             failure('connenction failure!! :)')
//         } else {
//             console.log(`time taken = ${delay} seconds`)
//             success(`here is your fake data ${url}`)
//         }
//     }, delay)
// }

// fakeCallBackRequest('books.com', function (response) {
//     console.log('its worked!!')
//     console.log(response)
//     fakeCallBackRequest('books.com/page01', function (response) {
//         console.log('its worked Again!!')
//         console.log(response)
//         fakeCallBackRequest('books.com/page03', function (response) {
//             console.log('its worked 3rd time!!')
//             console.log(response)
//         }, function (error) {
//             console.log('error!!')
//             console.log(error)
//         })
//     }, function (error) {
//         console.log('error!!')
//         console.log(error)
//     })
// }, function (error) {
//     console.log('error!!')
//     console.log(error)
// })
//==============================================================================


//==============================================================================
//try-02
//using promises but still nested 


//no need to understand this function 
//just know how to use it

// const fakeRequestPromises = (url) => {
//     return new Promise((resolved, reject) => {
//         let delay = Math.floor(Math.random() * 4500) + 500;
//         setTimeout(() => {
//             if (delay > 4000) {
//                 console.log(`time taken = ${delay} seconds`)
//                 reject('connenction failure!! :)')
//             } else {
//                 console.log(`time taken = ${delay} seconds`)
//                 resolved(`here is your fake data ${url}`)
//             }
//         }, delay)
//     })
// }

// //below +++ is for understanding no need to uncomment that while revisit
// //++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// // let response = fakeRequestPromises('facebook.com') //this returns promise object
// // console.log(response)
// // response.then(()=>{
// //     console.log("it worked!! ") //resolved state
// // }).catch(()=>{
// //     console.log('erorr!!')//rejected state
// // })
// //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// fakeRequestPromises('facebook.com')
//     .then(() => {
//         console.log('it worked!! Home page')
//         fakeRequestPromises('facebook.com/page01')
//         .then(()=>{
//             console.log('it worked!! page(1)')
//             fakeRequestPromises('facebook.com/page2')
//             .then(()=>{
//                 console.log('it worked!! page(2)')
//             })
//             .catch(()=>{
//                 console.log('erorr!! connection timeout :(')
//             })
//         })
//         .catch(()=>{
//             console.log('erorr!! connection timeout :(')
//         })
//     })
//     .catch(() => {
//         console.log('erorr!! connection timeout :(')
//     })

    //=============================================================================
