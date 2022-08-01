const express = require('express');
const app = express();
const port = 8081;

app.get('/', (req, res) => {
    console.log("/ response");
    res.send("Here and Ready!")
});

app.listen(port, () => {
    console.log("Ready on port", port);
});