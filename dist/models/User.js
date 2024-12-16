import { Schema, model } from 'mongoose';
const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, {
    toJSON: {
        virtuals: true,
    },
    id: false
});
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});
const User = model('User', UserSchema);
export default User;
