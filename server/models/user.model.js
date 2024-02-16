import mongoose from 'mongoose';

// Define schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  phone: String,
  password: String,
});

// Compile model from schema
const User = mongoose.model("User", UserSchema);

export default User ;