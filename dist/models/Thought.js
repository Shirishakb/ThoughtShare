import mongoose, { Schema } from 'mongoose';
import { dateFormat } from '../utils/dateFormat.js';
import reactionSchema from './Reaction.js';
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema], // Use imported reactionSchema
}, {
    toJSON: { virtuals: true },
    id: false,
});
// Virtual property to get reaction count
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
export const Thought = mongoose.model('Thought', thoughtSchema);
