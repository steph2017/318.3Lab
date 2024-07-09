const express = require("express");
const app = express();
const port = 3001;

// We import the body-parser package.
// This package contains middleware that can handle
// the parsing of many different kinds of data,
// making it easier to work with data in routes that
// accept data from the client (POST, PATCH).
const bodyParser = require("body-parser");

// These are now route imports, not database imports!
const users = require("./routes/users");
const posts = require("./routes/posts");

// We use the body-parser middleware FIRST so that
// we have access to the parsed data within our routes.
// The parsed data will be located in "req.body".
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));


// Logging Middlewaare
app.use((req, res, next) => {
    const time = new Date();

    console.log(
        `-----
  ${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
    );
    if (Object.keys(req.body).length > 0) {
        console.log("Containing the data:");
        console.log(`${JSON.stringify(req.body)}`);
    }
    next();
});


// Use our Routes
app.use("/api/users", users);
app.use("/api/posts", posts);

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
