import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import Connection from './database/connection.js';
import router from './routes/routes.js';
const app = express()
 
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use("/",router);

app.listen(8686,() => {
    console.log("Servidor rodando")
});
