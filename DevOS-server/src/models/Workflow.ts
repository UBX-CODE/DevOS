import  mongoose, {Schema, Document} from "mongoose";

export interface IWorkflow extends Document {
    projectId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    name: string;
    nodes: any[];
    edges: any[];
}

const workflowSchema = new Schema<IWorkflow>({
    projectId: {
        type: Schema.Types.ObjectId,
        ref:"Project",
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    name: {
        type: String,
        default: "Untitled Workflow",
    },
    nodes: {
        type: [Schema.Types.Mixed],
        default: [],
    } as any,
    edges: {
        type: [Schema.Types.Mixed],
        default: [],
    } as any,
},{timestamps: true,});

export default mongoose.model<IWorkflow>("Workflow", workflowSchema);