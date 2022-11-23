const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("."));

app.listen(8080);

app.get("/demo", (req,res) => {
   res.send('hello');
});
