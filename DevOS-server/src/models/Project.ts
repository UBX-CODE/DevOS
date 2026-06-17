import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:[
            "PLANNED",
            "IN_PROGRESS",
            "COMPLETED",
        ],
        default:"PLANNED",
    },
    priority:{
        type:String,
        enum:[
            "LOW",
            "MEDIUM",
            "HIGH",
            "CRITICAL"
        ],
        default:"MEDIUM",
    },
    githubUrl: {
        type: String,
    },
    liveUrl: {
        type: String,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
},
{timestamps:true});

export const Project = mongoose.model("Project", projectSchema);