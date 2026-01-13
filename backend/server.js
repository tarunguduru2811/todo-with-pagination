const express = require("express");
const app = express();
const todoRoutes = require("./routes/todoRoutes")
const cors = require("cors");
const { dbConnect } = require("./config/dbConnect");

app.use(cors({
    origin:"*"
}));
app.use(express.json())
dbConnect();

const PORT = 5000;

app.use("/api/todo",todoRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`)
})