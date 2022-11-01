//In these section Goal is to make the html file without design and show it on client
//next folder we will see to to send back to client html as well as css,js etc file 
//then next folder we will see how to distribute navbar to all page  

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

app.get('/r/:subreddit',(req,res)=>{
    const {subreddit} = req.params
    const data = reditData[subreddit]   //data will be undefined if key (subreddit) is not found
    if(data){   //not undefined
        res.render('subreddit',{...data})   //data (object) is spreaded so that we can use inside key directly
    }else{
        res.render('errorPage',{subreddit}) 
    }
})