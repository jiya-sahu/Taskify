import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100,
  },
  description:{
    type:String,
    maxlength:1000,
    trim:true,
  },
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  }
  , members:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  }]
},{
    timestamps:true,
});

export default mongoose.model("Project", projectSchema);