//After the folder "A more complex subreddit demo" code will continue from here
//in previous folder we saw only html file is send back to client
//in this section we will see how to send back html,css,js... etc file to client like real world  

const path = require('path')
const express = require('express')
const reditData = require('./data.json') //in json file we do not need to module.export a object
                                          //we can autometically require() it 
// console.log(redditData);              //reditData is a object which is sent by data.json file 

const app = express()

app.listen(8090,()=>{
    console.log('Server Started: ');
    console.log('Listeening to Port 8090: ');
})

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'/views'))

// app.use(express.static('public'))       //in this way we can share a folder in middleware
                                        //this public folder is serve in 
                                        //between request coming in to service and respond going to client

app.use(express.static(path.join(__dirname,'/public')))     //same as views we also have to define path

app.get('/r/:subreddit',(req,res)=>{
    const {subreddit} = req.params
    const data = reditData[subreddit]   //data will be undefined if key (subreddit) is not found
    if(data){   //not undefined
        res.render('subreddit',{...data})   //data (object) is spreaded so that we can use inside key directly
    }else{
        res.render('errorPage',{subreddit}) 
    }
})

/*
    ************************************************************************************ 
                    Serving static Assets means serving back to client 
        with html,css,bootstrap,js,image,logo,audio,video....etc file as a respond 

    ************************************************************************************ 



                    ****** Serving static Assets procedure ******
------------------------------------------------------------------------------------
    step01: public folder same directory te create kora lagbe 
    step02: app.use(express.static('public')) eita add kora lagbe
    step03: but same views folder er moto eitao onno jayga the access kora jabena
    step04: onno jayga theke access pete hole path define korte hobe same as views
    step05: (express.static('public'))
    step06: html.ejs folder e css , bootstrap etc link thikthak add korte hbe
    step07: we can serve more that one folder/directory like below
            app.use(express.static('css'))
            app.use(express.static('js'))
                        .
                        .
                        .
    step08: all the files inside 'public' folder is actually shared in link we can see then 
            by typing in url --> 'homepage/filename.extension'
*/

