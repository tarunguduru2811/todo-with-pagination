const express = require("express");
const app = express();
const todoRoutes = require("./routes/todoRoutes")
const cors = require("cors");
const { dbConnect } = require("./config/dbConnect");
const dotenv = require("dotenv")
dotenv.config();

app.use(cors({
    origin:"*"
}));
app.use(express.json())
dbConnect();

const PORT = process.env.PORT;

app.use("/api/todo",todoRoutes);

app.use('/',(req,res)=>{
    res.send("Hello from Tarun...")
})
app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`)
})