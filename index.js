const express = require("express");
const app = express();
const port = 3001;

// Importing the data from our fake database files.
const users = require("./data/users");
const posts = require("./data/posts");


app.get("/", (req, res) => {
    res.send("Work in progress!");
});

app.get("/api/users", (req, res) => {
    res.json(users);
});

app.get("/api/users/:id", (req, res, next) => {
    const user = users.find((u) => u.id == req.params.id);
    if (user) res.json(user);
    else next();
});

app.get("/api/posts", (req, res) => {
    res.json(posts);
});

app.get("/api/posts/:id", (req, res, next) => {
    const post = posts.find((p) => p.id == req.params.id);
    if (post) res.json(post);
    else next();
});

app.get("/", (req, res) => {
    res.send("Work in progress!");
});


// Custom 404 (not found) middleware.
// Since we place this last, it will only process
// if no other routes have already sent a response!
// We also don't need next(), since this is the
// last stop along the request-response cycle.
app.use((req, res) => {
    res.status(404);
    res.json({ error: "Resource Not Found" });
});


app.listen(port, () => {
    console.log(`Server listening on port: ${port}.`);
});
