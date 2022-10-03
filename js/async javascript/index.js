// console.log('I print first')
// setTimeout(()=>{
//     console.log('I print after 5 second')
// },5000)
// console.log('I print second')

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

//try-03
//using promises no nest just return value 
//we will use it from now on

// const fakeRequestPromises = (url) => {
//     return new Promise((resolved, reject) => {
//         let delay = Math.floor(Math.random() * 4500) + 500;
//         setTimeout(() => {
//             if (delay > 4000) {
//                 // console.log(`time taken = ${delay} seconds`)
//                 reject('connenction failure!! :)')
//             } else {
//                 // console.log(`time taken = ${delay} seconds`)
//                 resolved(`here is your fake data ${url}`)
//             }
//         }, delay)
//     })
// }


// //without perameter
// // fakeRequestPromises('kaggle.com/home')
// // .then(()=>{
// //     console.log('it worked !! home page')
// //     return fakeRequestPromises('kaggle.com/home/dataset')
// // })
// // .then(()=>{
// //     console.log('it worked !! dataset')
// //     return fakeRequestPromises('kaggle.com/home/dataset/fertilizerSuggession')
// // })
// // .then(()=>{
// //     console.log('it worked !! fertilizerSuggession')
// // })
// // .catch(()=>{
// //     console.log('oppss!! not worked !!')
// // })


// //with perameter
// // fakeRequestPromises('kaggle.com/home')
// // .then((data)=>{
// //     console.log('it worked !! home page')
// //     console.log(data)
// //     return fakeRequestPromises('kaggle.com/home/dataset')
// // })
// // .then((data)=>{
// //     console.log('it worked !! dataset')
// //     console.log(data)
// //     return fakeRequestPromises('kaggle.com/home/dataset/fertilizerSuggession')
// // })
// // .then((data)=>{
// //     console.log('it worked !! fertilizerSuggession')
// //     console.log(data)
// // })
// // .catch((data)=>{
// //     console.log('oppss!! not worked !!')
// //     console.log(data)
// // })


//----------------------------------------------------------------------------------------------


//creating own promises
//whenever resolve and rejected called promise will return to then() and catch() accordingly

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//intro to promise

// const createFakePromises = (color,delay)=>{
//         return new Promise((resolved,rejected)=>{
//             rejected()
//         })
// }
// createFakePromises(1,2)
// .then(()=>{
//     console.log('resolved')
// })
// .catch(()=>{
//     console.log('rejected')
// })
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



//so now create our own promise
// const colorDelay = (color,delay)=>{
//     return new Promise((resolve,rejected)=>{
//         setTimeout(()=>{
//             document.body.style.backgroundColor = color
//             resolve()
//         },delay)
//     })
// }

// // colorDelay('red',1000)
// // .then(()=>{
// //     return colorDelay('green',1000)
// // })
// // .then(()=>{
// //     return colorDelay('purple',1000)
// // })
// // .then(()=>{
// //     return colorDelay('teal',1000)
// // })
// // .then(()=>{
// //     return colorDelay('pink',1000)
// // })
// // .then(()=>{
// //     console.log('Done!!')
// // })
// // .catch(()=>{
// //     console.log('here no rejection so i will not called a single time')
// // })

// //or return shorthand
// colorDelay('red',1000)
// .then(()=> colorDelay('green',1000))
// .then(()=> colorDelay('teal',1000))
// .then(()=> colorDelay('yellow',1000))
// .then(()=> colorDelay('blue',1000))
// .then(()=> colorDelay('pink',1000))
// .then(()=>{
//     console.log('done!')
// })
// .catch(()=>{
//     console.log('here no rejection so i will not called a single time')
// })


//-----------------------------------------------------------------------------------------------


//async keyword
//async function autometically return promises 
//if we return something it is resolved and if we throw it is rejected


// intro 
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// const demo1 = async function(){
//     return 'hello!'
// }
// const demo2 = async function(){
//     throw 'error!'
// }

// demo1()
// .then((data)=>{
//     console.log('inside catch')
//     console.log(data)
// })

// demo2()
// .catch((data)=>{
//     console.log('inside then')
//     console.log(data)
// })
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//async function example
//only password checking
// const login = async (username,password)=>{
//     if(!username || !password){
//         throw 'perameter missing' //code will go to catch() from here directly
//     }
//     if(password==='cr7'){
//         return `Welcome ${username}!!!` //code will go to then() from here directly
//     }
//     throw 'invalid password' //code will go to catch() from here directly
// }

// login('fahim','cr7')
// .then((data)=>{
//     console.log(data);
// })
// .catch((data)=>{
//     console.log(data);
// })

//----------------------------------------------------------------------------------------------


//await keyword
//example-01

// const colorDelay = (color,delay)=>{
//     return new Promise((resolve,rejected)=>{
//         setTimeout(()=>{
//             document.body.style.backgroundColor = color
//             resolve()
//         },delay)
//     })
// }

// //improving then() and replacing with await keyword 
// const awaitDemo = async ()=>{
//     await colorDelay('red',1000)
//     await colorDelay('green',1000)
//     await colorDelay('blue',1000)
//     await colorDelay('teal',1000)
//     await colorDelay('pink',1000)
//     return 'done!!'
// }

// // awitDemo()
// // .then((data)=>{
// //     console.log(data)
// // })
// //or
// const print = async ()=>{
//     let data= await awaitDemo()
//     console.log('print after await is done');
//     console.log(data);
// }
// print()

//==================================================================

//example-02

const fakeRequestPromises = (url) => {
    return new Promise((resolved, reject) => {
        let delay = Math.floor(Math.random() * 4500) + 500;
        setTimeout(() => {
            if (delay > 4000) {
                // console.log(`time taken = ${delay} seconds`)
                reject('connenction failure!! :)')
            } else {
                // console.log(`time taken = ${delay} seconds`)
                resolved(`here is your fake data ${url}`)
            }
        }, delay)
    })
}


const awaitDemo2 = async () => {
    try {
        let data
        data = await fakeRequestPromises('facebook.com')
        console.log(data)
        data = await fakeRequestPromises('facebook.com/profile')
        console.log(data)
        data = await fakeRequestPromises('facebook.com/profile/setting')
        console.log(data)
        data = await fakeRequestPromises('facebook.com/profile/setting/account')
        console.log(data)
        return 'successfull data store'
    }catch(e){
        console.log(e)
        throw 'unsuccessfull transfer data'
    }
} 

awaitDemo2()
.then((data)=>{
    console.log(data);
})
.catch((data)=>{
    console.log(data);
})