import mongoose, { Schema } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';


export const userSchema = new mongoose.Schema({ 
    name: {
      type: String,
      unique: false,
      required: true,
      trim: true,
    },
    email: {
        type: String,
        unique: false,
        required: true,
        lowercase: true,
        trim: true,
    },
});

export const User = mongoose.model('User', userSchema);
export const UserTC = composeWithMongoose(User);

// var schema = new Schema(
// {
//     name: String,
//     binary: Buffer,
//     living: Boolean,
//     updated: { type: Date, default: Date.now() },
//     age: { type: Number, min: 18, max: 65, required: true },
//     mixed: Schema.Types.Mixed,
//     _someId: Schema.Types.ObjectId,
//     array: [],
//     ofString: [String], // You can also have an array of each of the other types too.
//     nested: { stuff: { type: String, lowercase: true, trim: true } }
// })

// userSchema.statics.findByLogin = async function(login: string) {
//     let user = await this.findOne({
//       username: login,
//     });
//     if (!user) {
//       user = await this.findOne({ email: login });
//     }
//     return user;
// };
// userSchema.pre('remove', function(next:any) {
//     this.model('Message').deleteMany({ user: this._id }, next);
// });


