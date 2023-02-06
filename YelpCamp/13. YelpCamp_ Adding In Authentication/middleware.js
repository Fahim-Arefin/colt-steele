//this middleware is used for check if any user logged in or not
//use this middleware we protect route to access without log in
module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){         //passport provide isAuthenticated() this fuct

        //store the url they are requesting
        req.session.returnTo = req.originalUrl       //returnto is lost due to connect.sid changed
                                                    //solution: u can store it on database
        req.flash('error','You must logged in')
        res.redirect('/login')
    }else{
        next()
    }
}

//isAuthenticated() is checking if any user logged in or not 
