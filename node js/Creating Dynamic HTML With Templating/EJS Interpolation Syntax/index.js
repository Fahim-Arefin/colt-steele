//Goal is to see some syntax of ejs '<%= %>'

const express = require('express')
const app = express()

app.listen(3333, () => {
    console.log('Server Started: ')
    console.log('Listening On Port 3333: ')
})

app.set('view engine', 'ejs')          //to use ejs we need to set it 

//below two lines used for find correctly 'views' directory whenever we execute index.js from anywhere
const path = require('path')
app.set('views',path.join(__dirname,'/views'))      //now express look views according to this path

app.get('/', (req, res) => {
    // res.send('This is home page')
    res.render('homepage')
})



