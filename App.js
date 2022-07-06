require('dotenv').config();
const express = require("express")
const app = express();
const mongo = require("./util/database");
const {home,searchEmoji} =require("./lib/routes")
const register = require("./lib/register");


app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static('public'))


app.post("/register",register )

app.use("/:emoji",searchEmoji )

app.use("/",home )

const port = process.env.PORT || 3002;


mongo.mongoConnect(() => {
    app.listen(port)
})

