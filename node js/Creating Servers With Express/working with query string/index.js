//goal is to extract query string    (facebook.com/profile?search=tanjim)

const express = require('express')
const app = express()

app.listen(1000,()=>{
    console.log('Server Started : ')
    console.log('Listening to port 1000 : ')
})

// app.get('/:something',(req,res)=>{
//     const {something} = req.params
//     res.send(`looking profile name ${something}`)        
// })

app.get('/profile',(req,res)=>{
    console.log(req.query)
    const {name,id} = req.query
    res.send(`looking profile name: ${name} id: ${id}`)
})


/*     
         --------------try it---------------
        http://localhost:1000/profile?name=fahim&id=221
*/