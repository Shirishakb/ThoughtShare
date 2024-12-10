import { Schema, model, type Document } from 'mongoose';
import { dateFormat } from '../utils/dateFormat.js';
import reactionSchema from './Reaction.js'

export interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: [typeof reactionSchema]
}

const thoughtSchema = new Schema<IThought>({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
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

export const Thought = mongoose.model<IThought>('Thought', thoughtSchema);
