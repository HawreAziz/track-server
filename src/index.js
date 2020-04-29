
require("./model/UserModel");
require("./model/Track");
const express = require("express");
const mongoDB = require("mongoose");
const authRouter = require("./routes/authRoute");
const trackRouter = require('./routes/trackRoute');
const bodyParser = require("body-parser");
const userAuth = require("./middleware/userAuth");

// mongoDB instance, connection handlers
const mongoURL = "mongodb+srv://admin:roottoor@cluster0-bygue.mongodb.net/test?retryWrites=true&w=majority"

mongoDB.connect(mongoURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});


mongoDB.connection.on("connected", () => {
    console.log("Connected to mongoDB instance");
});

mongoDB.connection.on("error", (error) => {
    console.log("Error connecting to mongoDB", error);
});



// main app, http request handler
const app = express();
app.get("/", userAuth, (req, res) => {
    res.send("GET: Wellcome to express server");
});

app.use(bodyParser.json());
app.use(authRouter);
app.use(trackRouter);

app.listen(3000, () => console.log("Express server is running..."));
