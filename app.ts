import { Request, Response, Express } from "express";
import express from 'express'
import env from "dotenv"
import categoryRoute from "./routes/category.js"; 
import hotlineRoute from "./routes/hotline.js"; 
import productRoute from "./routes/product.js"; 
import shopRoute from "./routes/shop.js"; 
import dataSource from "./db/dbConfig.js";


env.config
const app: Express = express();
const PORT: Number = 3000;
const Root: "/" = "/";
let con: number = 0;
let connections: any = [];

app.use( productRoute );
app.use( shopRoute );
app.use(hotlineRoute  );
app.use( categoryRoute );


// Route.
(express()).get(Root, (req: Request, res: Response) => {
    res.send("hello world");
})

(express()).get("/data", (req: Request, res: Response) => {
    res.json({
        data: 'success',
        Type: true,
    });

})


let Server = (express()).listen(PORT, () => {

    console.log("port is running on the " + PORT);
});








// Handle the connection.
Server.on("connection", (connection: any) => {
    connections.push(connection);

    connection.on("close", function () {
        connections = connections.filter((cur: any) => {
            cur !== connection
        })
    })
})

// Close the Connection.
connections.forEach((curr: any) => {
    curr.close();
});


module.exports = { app: express(), Server }
export default dataSource 