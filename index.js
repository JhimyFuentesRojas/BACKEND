const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const { logErrors, errorHandler, boomErrorHandler } = require("./middlewares/error.handler");
const routerApi = require('./routes');


app.use(express.json());





app.get("/", (req, res)=>{
    res.send("Este es mi servidor en Express"); 
});


app.get("/otraRuta", (req, res)=>{
    res.send("Mi otra tienda en Express"); 
});

// localhost:3000/api/v1/categories/1/productos/1

// localhost:3000/api/v1/product/123

// http://localhost:3000/api/v1/products

// http://localhost:3000/api/v1/users?limit=3&offset=3

routerApi(app);

app.use(logErrors);
app.use(errorHandler);
app.use(boomErrorHandler);

app.listen(port, ()=>{
    console.log("My port: " + port);
});

