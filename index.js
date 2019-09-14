//load app server

const express = require('express');
const app = express();
const port = process.env.PORT ||  8888;


const path = __dirname;



app.use(express.static('./public'));



app.get("/", (req, res) => {
  res.sendFile(path + "/views/index.html");
});


app.listen(port, () => {
  console.log("server is up and listening on " + port);
});
