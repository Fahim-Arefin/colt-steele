const bcrypt = require('bcrypt')
let password = 'monkey'
let hashedPassword
const hashThePassword = async(originalPassword)=>{
    const salt = await bcrypt.genSalt(12)   //saltRound = 12 , its recommanded
                                            //saltRound is how much delay we would like to do
                                            //when we hash a password.Delay is good to security

    // return await bcrypt.hash(originalPassword,salt) //store it to database
    hashedPassword = await bcrypt.hash(originalPassword,salt) //store it to database
   
}

const login = async(password,hashedPassword)=>{
    const result = await bcrypt.compare(password,hashedPassword)
    if(result){
        console.log('Successfull Matched!!')
    }else{
        console.log('Incorrect Password')
    }
}

// hashThePassword(Password)
// .then((data)=>{
//     console.log(data)
// })

const varify = async()=>{
    await hashThePassword(password)
    await login(password,hashedPassword)
}

varify()
// hashThePassword(password)
// .then(()=>{
//     console.log(hashedPassword)
// })

// login(password,hashedPassword)


/*
01:   
                                    Authentication vs Authorization
    -----------------------------------------------------------------------------------------------------
        ## Authentication and authorization are two separate security concepts
           that are frequently used together to control access to resources.

        ## Authentication is the process of verifying the identity of a user or
           a system to confirm that they are who they claim to be. 
           This is typically done by requiring the user to provide a set of credentials,
           such as a username and password, which are then verified against a database of authorized users.

        ## Authorization, on the other hand, is the process of determining what
           a user or system is allowed to do once their identity has been established 
           through the authentication process. This involves granting or denying access to 
           specific resources or actions based on the user's role or permissions.
           For example, a user with admin privileges may be authorized to perform actions
           such as adding or modifying other users, while a regular user may only 
           be authorized to perform actions such as reading data or making purchases.

        ## In summary, authentication is used to identify a user or system,
           while authorization is used to determine what actions they are allowed to perform.



02:   
                                        How to (not) store Password
    -----------------------------------------------------------------------------------------------------
        ## Never Store Password as it is
        ## We Hash the passsword using some Hashing Function ,
           then we stored the Hash value to the database

        ## A hashing function is a mathematical algorithm that takes an input (or "message") 
           and returns a fixed-size string of characters, which is typically a "digest" that
           is unique to that specific input. The output is referred to as the hash value or 
           simply the hash.
            
        ## We stored the hash value to database then when user comes to
           authenticate with username and password, we first run the same 
           hash function for that password and check this value matches to the 
           stored value bcz hash fuct always return same value for a same 
           input.


03:   
                                Cryptographic Hash Function
    ---------------------------------------------------------------------------------------------
        ## One-way function which is infeasible to invert
        ## Small change in input yields large change in the output
        ## Deterministic - same input yields same output
        ## Unlikely to find 2 outputs with same value
        ## Password Hash Functions are deliberately SLOW


        
04:   
                                        Password Salt
    ---------------------------------------------------------------------------------------------
        ## A salt is a random value that is added to the password for extra security.

        ## Why we use salt in the password??
           - We use some common 'Cryptographic hash func generator'
           - Many user use same password  
           - Many user use common password 
             which is listed in internet as a common password
           Now a hacker knows that we use Bcrypt for hash func (because we do not hide this
           info, And there are not many hash func to generate password,) then he look up
           common password list on internet and hash it and match to our database password,
           in this way he can know the password.
        
        ## What is password salt??
           - Password salt is a random value added to a password before it is hashed. 
             The purpose of using a salt is to ensure that even if two users have 
             the same password, their hashes will be different and more secure. 
             This makes it more difficult for an attacker to use a precomputed 
             dictionary of hashes to crack multiple passwords, as each password will 
             have a unique salt and therefore a unique hash.

        ## How to salt password??

           - Generate a unique salt value for each user: 
             A salt value should be unique for each user and generated randomly.
             It should be long enough to ensure that it is not easily guessable or brute-forceable.

           - Store the salt value along with the user's account information: 
             The salt value should be stored in a secure location, 
             such as a database, along with the user's account information.

           - Add the salt value to the password before hashing: When a user creates an account 
             or changes their password, the salt value should be added to the password before 
             it is hashed. The salt value and the hashed password should be stored in the user's
             account information.

           - Verify the password during authentication: During authentication, the entered password
             is combined with the stored salt value and then hashed. The result is compared to the
             stored hashed password to determine if the user has provided the correct password.


           *** 
               - Salt value is random and unique value to each user.
               - salt value added in the password before hashing.
               - each user's password salt value should be
                 stored along with that user information. 
           ***
               



05:   
                                    Intro to Bcrypt
    ----------------------------------------------------------------------------------------
        ## We use Bceypt as 'Cryptographic Hash Function'
        ## install 'npm i bcrypt' and require it
        ## read doc
        ## We hashedPassword and save it to database using 
           bcrypt.salt(saltRound) & bcrypt.hash(originalPassword,salt)
           and save the return value of brcypt.hash

        ## the authenticate password with 
           brcypt.compare(givenPassword,hashedPasswordthatStoredInDatabase)

*/