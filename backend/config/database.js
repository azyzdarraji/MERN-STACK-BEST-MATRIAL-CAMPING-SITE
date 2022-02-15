const mongoose=require("mongoose");
require("dotenv").config({path:'./config/config.env'})


const connectDatabase=async()=>{
    // mongoose.connect(process.env.DB_URI,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true
    //     }).then((data)=>{
    //         console.log(`Mongodb connected with server: ${data.connection.host}`);
    //     }).catch((err)=>{
    //         console.log(err)
    //     })

    try {
        await mongoose.connect(process.env.DB_URI)
                console.log(`Mongodb connected with server: http://localhost: ${process.env.PORT}`);
} catch (error) {
         console.log('db not connected')
         
     }
 
}

module.exports= connectDatabase