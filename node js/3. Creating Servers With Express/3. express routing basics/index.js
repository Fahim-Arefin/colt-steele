//now we send 'get & post' respond to user in browser by res.send() func

const express = require('express');
const app = express()

// app.use((req, res)=>{    //this is a middleware it runs when any request(get/post..) is made

//     console.log('We Got A New Request');
//     res.send('We got your request. Here is your respond data'); 
    
// })

app.get('/',(req,res)=>{                        //indicate homepage
    res.send('this is home page')
})

app.get('/cats',(req,res)=>{                    //exactly matches with homepage/cats 
    res.send('MEOW!!')
})

app.get('/dogs',(req,res)=>{                    //exactly matches with homepage/dogs
    res.send('WOOF!!')
})

app.post('/settings/profile',(req,res)=>{        //exactly matches with homepage/settings/profile
    res.send('Your Profile')
})

app.post('/dogs',(req,res)=>{                    //exactly matches with homepage/dogs
    res.send('WOOF!! (post req)')
})

app.get('*',(req,res)=>{                        //it mean any url, Place it in last
    res.send('UPPS!! DONT KNOW THE PATH')
})

app.post('*',(req,res)=>{                           //it mean any url, Place it in last
    res.send('UPPS!! DONT KNOW THE PATH (post)')
})



app.listen(8000,()=>{
    console.log('Server Started : ')
    console.log('Listening On The Port 8000 : ')
})

/*
    ---------------------------------IMPORTANT-------------------------------

    -- here home page is 'localhost:8000'
    -- but when we host our website home page name will change like www.facebook.com
    -- '/dogs' or '/cats' needs to match exactly

        localhost:8000/cats                         ==> correct
        localhost:8000/dogs                         ==> correct

        localhost:8000/                             ==> correct
        localhost:8000/cats/                        ==> correct
        localhost:8000/dogs/                        ==> correct

        localhost:8000/dog                          ==> not correct  
        localhost:8000/Cats                         ==> not correct

        localhost:8000/settings/dogs                ==> not correct
        localhost:8000/dogs/dogs                    ==> not correct
        localhost:8000/cats/buycat                  ==> not correct

    -- when send() is called then no other code will execute
       directly its return send() value to browser
    -- post req generates through form
    -- req with (*) means any url, if we put it in first all other codes ignored
*/