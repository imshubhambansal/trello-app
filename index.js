const express = require("express");
const jwt = require("jsonwebtoken");
const {authMiddleware} = require("./middleware");


let USERS_ID = 1;
let ORGANIZATION_ID = 1;
let BOARD_ID = 1;
let ISSUES_ID = 1;

// In-memory Database
const USERS = [];

const ORGANIZATIONS = [];

const BOARDS = [];

const ISSUES = [];

const app = express();
app.use(express.json());

// Create Endpoints
// New User Signup
app.post("/signup", (req, res) => {

    // Extracting username and password
    const username = req.body.username;
    const password = req.body.password;
    
    // Checking if the user already exists in database
    const userExists = USERS.find(u => u.username === username);
    
    // If user already exists then returning error message
    if(userExists) {
        return res.status(411).json({
            message: "User with this username already exists"
        })
    }

    // If user is new then adding it to database and assigning it a userId
    USERS.push({
        username: username,
        password: password,
        id: USERS_ID++
    })
    res.json({
        message: "You have signed up successfully"
    })

});

// Existing User Signin
app.post("/signin",(req, res) => {

    // Extracting username and password
    const username = req.body.username;
    const password = req.body.password;

    // Checking if the user exists in database
    const userExists = USERS.find(u => u.username === username && u.password === password);

    // If user does not exists then returning error message
    if(!userExists){
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }

    // If user exists then generating it a jwt token and then returning the token
    const token = jwt.sign({
        userId: userExists.id
    }, "supersecret123");

    res.json({
        token
    })
});

// Creating new Organization by User
app.post("/organization",authMiddleware , (req, res) => {

    // Extracting the userid 
    const userId = req.userId;

    // Creating the organization
    ORGANIZATIONS.push({
        id: ORGANIZATION_ID++,
        title: req.body.title,
        description: req.body.description,
        admin: userId,
        members: []
    })

    res.json({
        message: "Organization Created",
        id: ORGANIZATION_ID - 1
    })
});

// Adding members to an organization by organization's admin
app.post("/add-member-to-organization", authMiddleware, (req, res) => {
    
});

// Create Board
app.post("/board", (req, res) => {

});

// Create Issue
app.post("/issue", (req, res) => {

});

// Read Endpoints
// Getting all boards of a particular Organization
app.get("/boards", (req, res) => {

});

// Getting all the issues
app.get("/issues", (req, res) => {

});

// 
app.get("/members", (req, res) => {

});

// Update Endpoints
// Update an Issues
app.put("/issues", (req, res) => {

});

// Delete Endpoints
// Delete a Member
app.delete("/members", (req, res) => {

});

app.listen(3000);