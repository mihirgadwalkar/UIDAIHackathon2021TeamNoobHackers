//create mini express application
const exp=require("express")
const aadhaarApi=exp.Router();
const expressErrorHandler=require("express-async-handler")

//add body parser middleware
aadhaarApi.use(exp.json())

//create aadhaaruser using async and await method
aadhaarApi.post('/createaadhaar',expressErrorHandler(async (req,res,next)=>{
    let aadhaarCollectionObj = req.app.get("userAddressCollectionObject")
    let newUser=req.body;
    console.log(newUser)
    let user=await aadhaarCollectionObj.findOne({Aadhaar:newUser.Aadhaar})
   
    if(user!=null){
        res.send({message:"User already exists!"})
    }
    else{
        await  aadhaarCollectionObj.insertOne(newUser)
        res.send({message:"New User Created Successfully"})
    }
}))


aadhaarApi.get("/getaadhaar/:obj",expressErrorHandler(async (req,res,next)=>{
    let aadhaarCollectionObj = req.app.get("userAddressCollectionObject")
    let newUser=req.params.obj;
    let user=await aadhaarCollectionObj.findOne({Aadhaar:newUser})
    //if user existed
    if(user!=null){
        user.VTC=user.VTC.toLowerCase()
        user.SubDistrict=user.SubDistrict.toLowerCase()
        user.District=user.District.toLowerCase()
        user.Street=user.Street.toLowerCase()
        user.Area=user.Area.toLowerCase()

        if(user.VTC===user.SubDistrict && user.SubDistrict===user.District){
            user.SubDistrict="N/A";
            user.District="N/A";
        }
        else if(user.VTC===user.SubDistrict){
            user.SubDistrict="N/A";  
        }
        else if(user.District===user.SubDistrict){
            user.SubDistrict="N/A";
        }

        let str=user.Street.replace(/[^a-zA-Z ]/g,"");
        let area=user.Area.replace(/[^a-zA-Z ]/g,"");

        str=str.replace(/ /g,"");
        area=area.replace(/ /g,"");

        if(str===area){
            if(str===""){
                user.Area="N/A";
                user.Street="N/A";                  
            }
            else{
                user.Area="N/A";
            }
        }
        res.send({message:user})
    }
    else{
        res.send({message:"User does not exist! Please Register yourself for AADHAAR"})
    }
}))

//export aadhaarApi
module.exports=aadhaarApi;