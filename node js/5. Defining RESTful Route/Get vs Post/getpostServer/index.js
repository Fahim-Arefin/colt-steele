const express = require('express')
const app = express()

app.listen(2080,()=>{
    console.log('Server Started: ')
    console.log('Listening on port 2080: ')
})


app.get('/tacos',(req,res)=>{
    const {meat,qty} = req.query   // meat,qty exactly html form er name er shathe mila lagbe
    res.send(`Ok, Here is your ${qty} ${meat}`)
})



app.use(express.json())                          // for parsing application/json

app.use(express.urlencoded({ extended: true }))  // for parsing application/x-www-form-urlencoded
                                                    //form theke post data send korte hoye eita use korbo

app.post('/tacos',(req,res)=>{
    //console.log(req.body)       //by default req.body returns undefined
                                //we have to add bodyParser and also bodyParser formet(form ,json...)
                                //req.body is a object 

    const {meat,qty} = req.body     // meat,qty exactly json property/html form er name er shathe mila lagbe
    res.send(`Ok, Here is your ${qty} ${meat}`)
})



//BASIC

//app.use is a middleware, which is activated when any kind of req is sent
//middleware activated between req and res time 

//app.use(bodyParser.json()) --> ei middleware er maddhe define kore dilam data ta json hishe ashbe
//app.use(bodyParser.urlencoded({ extended: true })) -->  ei middleware er maddhe define kore dilam data ta form hishebe ashbe



//Get data recieve korbo req.query er madhhome
//Post data recieve korbo req.body er madhhome



/*              **Postman demo**

 -- get req send korar time e params e name value set kore pathabo
 -- post req send korar time e 
    form --> body te name ,value set kore pathabo
    json --> obj create kore pathabo. (raw select kore json formet e click kore tarpor obj pathabo)
*/
