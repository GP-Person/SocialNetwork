import { Schema, Types, model, type Document } from 'mongoose';

interface IReaction extends Document {
    reactionId: Schema.Types.ObjectId,
    reactionBody: string,
    username: string,
}

interface IThought extends Document {
    thoughtText: string,
    username: string,
    reactions: [IReaction],
}

const reactionSchema = new Schema <IReaction>(
    {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
},
    {
    timestamps: true,
    _id: false }
);
const thoughtSchema = new Schema <IThought>({
    thoughtText: {
        type: String,
        required: true,
        max_length: 280,
        min_length: 1,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
}, {
    toJSON: {
        getters: true,
    },
    timestamps: true
});
const Thought = model('Thought', thoughtSchema);
export default Thought;
