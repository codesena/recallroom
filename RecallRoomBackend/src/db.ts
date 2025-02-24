import mongoose, { model, Schema } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const ContentSchema = new Schema({
  title: { type: String },
  link: { type: String },
  type: { type: String },
  tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }], // array of tags
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    require: true,
    unique: true,
  },
});
const LinkSchema = new Schema({
  hash: { type: String, unique: true },
  userId: { type: mongoose.Types.ObjectId,  ref: "User", require: true, unique: true },
});

export const UserModel = model("User",    UserSchema);
export const ContentModel = model("Content", ContentSchema);
export const LinkModel = model("Link", LinkSchema);
