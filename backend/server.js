const express = require("express");
const app = express();
const todoRoutes = require("./routes/todoRoutes")
const cors = require("cors");
const { dbConnect } = require("./config/dbConnect");
const dotenv = require("dotenv")
const promBundle = require("express-prom-bundle");

dotenv.config();

app.use(cors({
    origin:"*"
}));
app.use(express.json())

// Prometheus Metrics Middleware
const metricsMiddleware = promBundle({
    includeMethod: true, 
    includePath: true, 
    includeStatusCode: true, 
    includeUp: true,
    promClient: {
        collectDefaultMetrics: {}
    }
});
app.use(metricsMiddleware);
dbConnect();

const PORT = process.env.PORT;

app.use("/api/todo",todoRoutes);

app.use('/',(req,res)=>{
    res.send("Hello from Tarun...")
})

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`)
})