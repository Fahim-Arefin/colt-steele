//passing data to templates

const path = require('path')
const express = require('express')
const app = express()

app.listen(2424, () => {
    console.log('Server Started: ')
    console.log('Listening On Port 2424: ')
})

app.set('view engine', 'ejs')          
app.set('views',path.join(__dirname,'/views'))     

app.get('/', (req, res) => {
    res.render('homepage')
})

app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random()*10)+1    
    res.render('random',{num})   
})
 
app.get('/r/:subreddit', (req, res) => {
    const {subreddit} = req.params
    res.render('subreddit',{subreddit})   
})

//rendom template is updated
//check it , inside random <% %> is demonstrated 








