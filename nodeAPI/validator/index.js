exports.createPostValidator = (req,res,next) => {
    req.check("title","Write a tittle").notEmpty()
    req.check("title","The title should be between 4 and 150 chars").isLength({
        min: 4, 
        max: 150
    })
    req.check("body","Write a body").notEmpty()
    req.check("title","The body should be between 4 and 2000 chars").isLength({
        min: 4, 
        max: 2000
    })  
    //check for errors
    const errors = req.validationErrors()
    //if erro show the first one as they happen
    if(errors){
        const firstError= errors.map((error)=> error.msg)[0]
        return res.status(400).json({error: firstError})
    }
    //proceed to next middleware
    next();
};

exports.userSignupValidator = (req, res, next) => {
    // name is not nul and between 4-10 chars
    req.check("name", 'Name is required').notEmpty();
    //email is not null, valud and normalised 
    req.check("email", "Email must be between 3 and 32 chars")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
        min: 4,
        max: 2000
    })
    //check for password
    req.check("password", 'Password is required').notEmpty();
    req.check("password")
    .isLength({min: 6})
    .withMessage("Password muct contain at least 6 chars")
    .matches(/\d/)
    .withMessage("Password must contain a number")
    //check for errors
    const errors = req.validationErrors()
    //if erro show the first one as they happen
    if(errors){
    const firstError= errors.map((error)=> error.msg)[0]
    return res.status(400).json({error: firstError})
    }
    //proceed to next middleware
    next();
};

    exports.passwordResetValidator = (req, res, next) => {
        // check for password
        req.check("newPassword", "Password is required").notEmpty();
        req.check("newPassword")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 chars long")
            .matches(/\d/)
            .withMessage("must contain a number")
            .withMessage("Password must contain a number");
     
        // check for errors
        const errors = req.validationErrors();
        // if error show the first one as they happen
        if (errors) {
            const firstError = errors.map(error => error.msg)[0];
            return res.status(400).json({ error: firstError });
        }
        // proceed to next middleware or ...
        next();
    };
    
