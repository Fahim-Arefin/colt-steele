//passing data to templates
const path = require('path')
const express = require('express')
const app = express()

app.listen(420, () => {
    console.log('Server Started: ')
    console.log('Listening On Port 420: ')
})

app.set('view engine', 'ejs')          
app.set('views',path.join(__dirname,'/views'))     

app.get('/', (req, res) => {
    res.render('homepage')
})

app.get('/rand', (req, res) => {

    const num = Math.floor(Math.random()*10)+1    //1-10 random numbers will generate
    res.render('random',{rand:num})   //we can pass value using second parameter.
                                      //key 'rand' is holding the num 'value'
                                      // in random.ejs we can refer num using rand variable
                                      //rand variable autometic passed to random.ejs 
                                      //template with the value 'num'
    //or
    // res.render('random',{num:num})  
    // res.render('random',{num})   //same as {num:num} , just shorthand
                                    //now in random.ejs file we have to 
                                    //change rand with num bcz we passed a key num
                                    //with value num

})



