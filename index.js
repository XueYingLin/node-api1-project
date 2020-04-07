console.log("hi");
const express = require('express');
const server = express();
let users = [
    {
        id: 1,
        name: "Jane Doe",
        bio: "Not Tarzan's wife, another Jane", 
    }
];

//middleware
server.use(express.json()); //teaches the srver to parse JSON from the body

//endpoints
server.get("/", (req, res) => {
    res.json({ api: "running.....!"});
});



// server.post("/api/users/:name", (req, res) => {
//     const name = req.params.name;
//     const bio = req.params.bio;
//     const user = users.find((user) => (user.name == name) || user.bio == bio);

//     if (user) {
//         res.status(201).json(user);
//     } else {
//         res.status(404).json({ errorMessage: "Please provide name and bio for the user." });
//     }
// })



server.post('/api/users', (req, res) => {
    const usersInfo = req.body;
    if ((usersInfo.name == null) || (usersInfo.bio == null)){
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    }
    else {
        try {
            users.push(usersInfo);
            res.status(201).json(usersInfo);    
        } catch (e) {
            res.status(500).json({ errorMessage: "There was an error while saving the user to the database" });
        }
    }
})

server.get('/api/users', (req, res) => {
    try {
         res.status(200).json(users);

    } catch (e) {
        res.res.status(500).json({ errorMessage: "The users information could not be retrieved." });
    }
})

server.get("/api/users/:id", (req, res) => {
    const id = req.params.id;
    try {
        const user = users.find((user) => user.id == id);


        if (user) {
            res.status(200).json(user);
        
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        }
    }
    catch (e) {
        res.res.status(500).json({ errorMessage: "The user information could not be retrieved." });
    }
})

const port = 5000; //the server is running on http:localhost:5000
server.listen(port, () => console.log(`\n== api on port ${port} ===\n`));