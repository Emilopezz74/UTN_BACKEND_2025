import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    workspace:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workspace',
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now
    },

     role: {
    type:String,
    enum:['admin', 'member'],
    default:'member'

    }
})
const MemberWorkspace = mongoose.model('Members',  memberSchema)
export default MemberWorkspace