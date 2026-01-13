const { default: mongoose } = require("mongoose")


exports.dbConnect = async () => {
    const MONGODB_URI ="mongodb+srv://root:123@cluster0.fckt2ni.mongodb.net/E-Commerce"
    await mongoose.connect(MONGODB_URI)
    .then(()=>{
        console.log("DB Connected Successfully")
    })
    .catch((err)=>{
        console.log("DB Connection Error",err);
    });
}