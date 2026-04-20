const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    
    // Extracting token that is sent by user with request
    const token = req.headers.token;

    // Decoding the token 
    const decoded = jwt.verify(token, "supersecret123");

    // Extracting the userid from the decoded data 
    const userId = decoded.userId;

    // decision making
    if(userId) {
        req.userId = userId;
        next();
    } else {
        res.status(403).json({
            message : "Token was Incorrect"
        })
    }

}

module.exports = {
    authMiddleware: authMiddleware
}