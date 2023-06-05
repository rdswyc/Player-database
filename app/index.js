const express = require("express");
const app = express();

const mysql = require("mysql");
const db = mysql.createConnection({
    host: "localhost",
    user: "webUser",
    password: "node.js-web4",
    database: "PlayerDb"
});
db.connect((err) => {
    if (err) throw err;
    console.log("Connected to database!");
});
global.db = db;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

require("./routes/main")(app);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

const port = 8081;
app.listen(port, () => console.log(`App listening on port ${port}!`));