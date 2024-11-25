import mongoose, { Document, Model, Schema } from "mongoose";

interface UserTypes extends Document {
  _id: string;
  name: string;
  email: string;
  password?: string;
}

const UserSchema: Schema<UserTypes> = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
});

const User: Model<UserTypes> =
  mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
