//goal is to match a pattern and extract link

const express = require('express')
const app = express()

app.listen(5000,()=>{
    console.log('Server Started : ')
    console.log('Listening to port 5000 : ')
})

app.get('/cat/:name',(req,res)=>{                //works exactly   ==>  'homepage/cat/something'
    const {name} = req.params
    res.send(`Cat name: ${name}`)
})

app.get('/cat/:name/:id',(req,res)=>{        //works exactly   ==>  'homepage/cat/something/something'
    const {name,id} = req.params
    res.send(`Cat name: ${name} and id: ${id}`)
})


/*
        -------------------------IMPORTANT-----------------------
        '/:something' means we can now reference anyvalue with the name something
        example:
                '/:cat'         url : localhost:5000/persiun
                --> we can now reference persiun with cat
                so simply print cat which value will be set persiun

                ':' na use korle extract kora jabena

*/