const mongoose=require("mongoose");

const connectDatabase=()=>{
    //{useNewUrlParser:true,useUnifiedTopology:true} remove kia hh
    mongoose.connect(process.env.DB_URI).then((data)=>{
        console.log(`Mongodb connected with server: ${data.connection.host}`);
    })
}

module.exports=connectDatabase