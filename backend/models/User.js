import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name : {
            type:String,
            required:[true,"name is required"],
            trim : true
        },

        email:{
            type:String,
            required: [true, "Email is required"],
            unique:true,
            lowercase:true,
            trim:true,
        },
        password :{
            type:String,
            required:[true, "Password is required"],
            minlength : 6,
        },
        role:{
            type:String,
            enum:["ADMIN", "PROJECT_MANAGER","EMPLOYEE"],
            default : "EMPLOYEE"
        },
        isVerified:{
            type:Boolean,
            default:false
        },
    },
        {
            timestamps: true,
        }
    
);

const User = mongoose.model("User",userSchema);
export default User;