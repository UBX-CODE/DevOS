import mongoose from "mongoose";

const taskSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ["TODO","IN_PROGRESS","DONE",],
        default: "TODO",
      },
      priority: {
        type: String,
        enum: ["LOW","MEDIUM","HIGH","CRITICAL",],
        default: "MEDIUM",
      },
      projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
      },
      userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

export const Task = mongoose.model("Task",taskSchema);