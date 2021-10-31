//create express application
const exp=require("express")
const app=exp();
const path=require("path")
//import mongoclient
const mc=require("mongodb").MongoClient;

//connect angular app with express server
app.use(exp.static(path.join(__dirname,"./dist/NoobHackersUIDAI2021/")))

//connection string
const databaseurl="mongodb+srv://noobhackers:noobhackers@mgcluster.i0kfn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

//connect to db
mc.connect(databaseurl,{useNewUrlParser:true, useUnifiedTopology:true},(err,client)=>{
    if(err){
        console.log("error in database connection",err)
    }
    else{
        //get database object from client object
        let databaseObj=client.db("noobhackersuid")
        //create user collection object
        let userAddressCollectionObject = databaseObj.collection("adressupdate")
        app.set("userAddressCollectionObject",userAddressCollectionObject)
        console.log("connected to database successfully")
    }
})


//import APIs
const aadhaarApi=require("./APIs/aadhaarApi")

//execure specific api based on path
app.use('/user',aadhaarApi)

//error handling middleware
app.use((err,req,res,next)=>{
    res.send({message:`error is ${err.message}`})
})


//invalid path
app.use((req,res,next)=>{
    res.send({message:`path ${req.url} is invalid`})
})

//assign port
const port=3000
app.listen(port,()=>console.log(`server is listening on port ${port}`))