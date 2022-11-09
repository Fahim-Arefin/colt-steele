class AppError extends Error{
    constructor(message,status){
        super()     
        this.message=message
        this.status=status
    }
}

module.exports = AppError

/*
    --> Error class has not always generate status for every error
    thats why we extends Error class and create a new AppError Class and 
    takes message and status so that we can genarate status for every error 
    --> now all the explicit error have status code

*/