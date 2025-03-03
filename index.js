// npm i express body-parser ejs htmlspecialchars mysql2  slashes@2.0.0  swagger-autogen
// npm i express body-parser ejs htmlspecialchars mysql2  slashes@2.0.0  swagger-autogen swagger-ui-express

const port = 7381;
const express = require('express');
const app = express();
app.use(express.json());

const bodyParser = require('body-parser');
const path = require("path");
app.use(bodyParser.urlencoded({extended: false}));

let db_M = require('./database');
global.db_pool = db_M.pool;

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, "/views"));

app.use("/CSS1",express.static(path.join(__dirname, "css")));
app.use("/js",express.static(path.join(__dirname, "js")));

global.htmlspecialchars = require('htmlspecialchars');
// const { addSlashes, stripSlashes } = require('slashes');


const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

var options = {
    explorer: true
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));


const Pages_R = require('./Routers/Pages_R');
app.use('/',Pages_R);
app.use('/history/',Pages_R);
app.use('/all-users/',Pages_R);
const users_R = require('./Routers/users_R');
app.use('/U/',users_R);
const values_R = require('./Routers/values_R');
app.use('/VAL/',values_R);
const history_R = require('./Routers/history_R');
app.use('/H-VAL/',history_R);
const allusers_R = require('./Routers/allusers_R');
app.use('/ALL-U/',allusers_R);
app.listen(port, () => {   //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port http://localhost:${port}`);
});