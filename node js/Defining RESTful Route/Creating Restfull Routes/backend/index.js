/*
                    Restfull server architechture Overview:(it is listed in the slide also)
                ------------------------------------------------
                    GET/comments  		    - list all comments

                    GET/comments/new        - Form to create new comment
                    POST/comments  		    - Create a new comments

                    GET/comments/:id	    - Get one comments (using ID)

                    GET/comments/:id/edit	- Form to edit specific comment
                    PATCH/comments/:id	    - Update one comment

                    DELETE/comments/:id	    - Destroy one comments

*/
const express = require('express')
const app = express()
const path = require('path')
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'/views'))

const methodOverride = require('method-override')  // After installing this package 'npm i method-override'

/*
    uuid its just a package to make uniqe id, in database we will create uniqe id
    in other ways.here just use it to demontration purpase
*/
const { v4: uuidv4 } = require('uuid');    //after 'npm i uuid' install this package we require it
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'


app.use(express.json())                         // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(methodOverride('_method'))  //this exact name should be added in the query string
                                    //in the action=".......?_method='patch/delete'" 
                                    //to override post method to patch/delete when update/delete somthing

app.listen(8086,()=>{
    console.log('Server Started: ')
    console.log('Listening on port 8086: ')
})



//this data will come from database but we fake it for now
//-----------------------------------------------------------------------
let comments = [
    {
        id : uuidv4(),
        username: "fahim arefin",
        comment: "lol it was sooo funny"
    },
    {
        id : uuidv4(),
        username: "sumon5113",
        comment: "whats the jokes origin"
    },
    {
        id : uuidv4(),
        username: "emon2123",
        comment: "i m still laughing, great joke"
    },
    {
        id : uuidv4(),
        username: "unmasked Hero22",
        comment: "lame!! why u make fan of him!!"
    },
    {
        id : uuidv4(),
        username: "sagor mutsia",
        comment: "hahaahhahahhaha !"
    }
]
//-----------------------------------------------------------------------


//GET/comments     - list all comments
app.get('/comments',(req,res)=>{
    res.render('comments/index',{comments})
})

//GET/comments/new     - Form to create new comment
app.get('/comments/new',(req,res)=>{
    res.render('comments/new')
})

// POST/comments    - Create a new comments
app.post('/comments',(req,res)=>{
    const {username,comment} = req.body
    comments.push({username,comment,id:uuidv4()})      //adding new comment to array

    // res.send('Comment Added Successfully !!')   //this is very bad,bcz in crome if we refresh page
                                                    // from here it will submit data again
                                                    //so we should redirect user to somewhere 

    res.redirect('/comments')    //by default it a get request.
                                 //we have to redirect user to somewhere.
})

// GET/comments/:id	        - Get one comments (using ID)
app.get('/comments/:id',(req,res)=>{
    const {id} = req.params
    const targetComment = comments.find((c)=>{
        if(c.id===id){
            return c; //returning a obj
        }
    })
    res.render('comments/show',{targetComment})
})



// GET/comments/:id/edit	- Form to edit specific comment
app.get('/comments/:id/edit',(req,res)=>{
    const {id} = req.params
    const targetComment = comments.find((c)=>{
        if(c.id===id){
            return c; //returning a obj
        }
    })
    res.render('comments/edit',{targetComment})
})



//PATCH/comments/:id	    - Update one comment
app.patch('/comments/:id',(req,res)=>{
    const {id} = req.params
    const {newComment} = req.body

    const targetComment = comments.find((c)=>{
        if(c.id===id){
            return c; //returning a obj
        }
    })

    targetComment.comment = newComment
    res.redirect('/comments')
    
})



//DELETE/comments/:id	 - Destroy one comments
app.delete('/comments/:id',(req,res)=>{
    const {id} = req.params
    comments = comments.filter((e)=>{
        return e.id!==id
    })
    res.redirect('/comments')

})