const path = require('path')
const express = require('express')
const app = express()

app.listen(4747,()=>{
    console.log('Server Started: ')
    console.log('Listening from port 4747: ')
})

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'/views'))

app.get('/animal/:animalName',(req,res)=>{
    const {animalName} = req.params 
    if(animalName==='cats'){
        const cats = ['persiun','chinese','mixed breed','spanish blackcat','asiancat']
        res.render('animal',{cats,animalName})
    }else if(animalName==='dogs'){
        const dogs = ['golden retriever','french bulldog','beagle','poodle']
        res.render('animal',{dogs,animalName})
    }else{
        errorMessage = 'Please enter valid animal'
        res.render('animal',{errorMessage,animalName})
    }
    
})

