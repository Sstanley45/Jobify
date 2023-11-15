import mongoose from "mongoose";
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide name"],
    minLength: 2,
    maxLength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "please provide email"],
      minLength: 2,
      unique: true,
      validate: {
          validator: validator.isEmail,
          message : 'please provide valid email'
    }
  },
  password: {
    type: String,
    required: [true, "please provide password"],
    minLength: 3,
    select: false
  },
  lastName: {
    type: String,
    default: "lastName",
    maxLength: 20,
    trim: true,
  },
  location: {
    type: String,
    default: "my city",
      maxLength: 20,
    trim: true
  }
});


UserSchema.pre('save', async function () {
  if(!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt) 
})

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME})
}

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
} 

export default mongoose.model('User', UserSchema);