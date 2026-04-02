const { default: mongoose } = require("mongoose")
const dotenv = require("dotenv")
dotenv.config();

exports.dbConnect = async () => {
    const MONGODB_URI = process.env.MONGODB_URI;
    
    console.log("MONGO_DB_URI:",MONGODB_URI)
    await mongoose.connect(MONGODB_URI)
    .then(()=>{
        console.log("DB Connected Successfully")
    })
    .catch((err)=>{
        console.log("DB Connection Error",err);
    });
}