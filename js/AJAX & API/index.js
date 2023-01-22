//Request Way-01
//XHR request or XMLHttpRequest
//very old ways.No one is using them,so no demostration made,no promises is supported

//----------------------------------------------------------------------------
//Request Way-02
//fetch Request
//Much better,we can use promises,but still not the best.

//version-01
// fetch('https://api.tvmaze.com/singlesearch/shows?q=girls') //return promises without data
// .then((response)=>{
//     console.log('Resposnse,Waiting to purse....',response)
//     return response.json() //this func also return promises but with data
// })
// .then((data)=>{
//     console.log('Here is your data',data)
//     console.log(`Avarage rating = ${data.rating.average}`)
// })
// .catch((error)=>{
//     console.log('Uppss Error happended!!!',error)
// })

//version-02
//TV show api

// const fetchTvShowsSingleData = async () => {
//     try {
//         let response = await fetch('https://api.tvmaze.com/singlesearch/shows?q=girls') //this returns promise without data
//         console.log('Resposnse,Waiting to purse....', response)
//         let data = await response.json() //this will collect data
//         console.log('Here is your data', data)
//         console.log(`Avarage rating = ${data.rating.average}`)

//     } catch (e) {
//         console.log('Uppss Error happended!!!', error)
//     }
// }
// fetchTvShowsSingleData()



//DAD Jokes API

// const dadJokesAPI = async () => {
//     try {
//         let response = await fetch('https://icanhazdadjoke.com/', { headers: { Accept: 'application/json' } })
//         let data = await response.json()
//         console.log(data)
//         console.log(`Dad makes this joke this time = "${data.joke}"`)
//     } catch (e) {
//         console.log(e)
//     }
// }
// dadJokesAPI()

//-----------------------------------------------------------------------------------------

//Request way-03
//Axios Request

//include Axios script in html.
//version-01


// axios.get('https://api.tvmaze.com/shows/1/episodebynumber?season=1&number=1') //this with return promise also with data
//     .then((res) => {
//         console.log(res)
//         console.log(`Average rating = ${res.data.rating.average}`)
//     })
//     .catch((e) => {
//         console.log(e)
//     })

//version-02
//Tv show season and episode API


// const seasonEpisode = async () => {
//     try {
//         let response = await axios.get('https://api.tvmaze.com/shows/1/episodebynumber?season=1&number=1')
//         console.log(response)
//         console.log(`Average rating = ${response.data.rating.average}`)
//     }catch(e){
//         console.log(e)
//     }
// }
// seasonEpisode()

//-------------------------------------------------------------------------------------------

//practice Axios with DOM

const jokesAPI = async () => {
    try {
        const header = {
            headers: {
                Accept: 'application/json'
            }
        }
        let response = await axios.get('https://icanhazdadjoke.com/', header) //return promise
        return response.data.joke
    } catch {
        return 'No jokes available'
    }
}

const btn = document.querySelector('button')
btn.addEventListener('click', async () => {
    const ul = document.querySelector('#dadJokes ul')
    const li = document.createElement('li')
    let joke = await jokesAPI()
    li.append(joke)
    ul.append(li)
})


//Jokes API v2
// const axios = require("axios");

// const options = {
//   method: 'GET',
//   url: 'https://jokeapi-v2.p.rapidapi.com/joke/Any',
//   params: {
//     format: 'json',
//     contains: 'C%23',
//     idRange: '0-150',
//     blacklistFlags: 'nsfw,racist'
//   },
//   headers: {
//     'X-RapidAPI-Key': 'a2cf8cc144msh110a5c8f9dccf78p19369ejsnb06269cfa00a',
//     'X-RapidAPI-Host': 'jokeapi-v2.p.rapidapi.com'
//   }
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });

//Jokes API v2
const anotherJokes = async () => {
    try {
        const object = {
            params: {
                format: 'json',
                idRange: '0-150',
                blacklistFlags: 'nsfw,racist'
            },
            headers: {
                'X-RapidAPI-Key': 'a2cf8cc144msh110a5c8f9dccf78p19369ejsnb06269cfa00a',
                'X-RapidAPI-Host': 'jokeapi-v2.p.rapidapi.com'
            }
        }
        let response = await axios.get('https://jokeapi-v2.p.rapidapi.com/joke/Any', object) //return promise
        console.log(response)
        return response
    } catch (e) {
        console.log(e)
        throw "unsuccessull request"
    }
}
const btn2 = document.querySelector('#jokes button')
btn2.addEventListener('click', async () => {
    const ul = document.querySelector('#jokes ul')
    const li = document.createElement('li')
    let anotherJoke = await anotherJokes()
    if (!(anotherJoke.data.joke)) {
        li.append(`${anotherJoke.data.setup}  ------> ${anotherJoke.data.delivery}`)
    } else {
        li.append(anotherJoke.data.joke)
    }

    ul.append(li)
})
