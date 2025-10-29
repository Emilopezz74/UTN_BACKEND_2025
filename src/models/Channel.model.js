import mongoose from "mongoose";

const channelSchema =  new mongoose.Schema ({

    name:{
        type: String,
        required: true
    },

    worskapce:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workspace",
        required: true
    },

    private:{
        type: Boolean,
        default: false 
    },

    active:{
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    modified_at: {
        type: Date,
        default: null
    }
})
const Channels = mongoose.model('Channel', channelSchema)
export default Channels