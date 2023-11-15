import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import { BadRequestError, UnAuthenticatedError } from "../Errors/index.js";




const register = async (req, res, next) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    throw new BadRequestError('please provide all credentials') 
  } 
  const userAlreadyExist = await User.findOne({ email })
  if (userAlreadyExist) {
    throw new BadRequestError(' email already on use!')  
  }
    
  const user = await User.create({ name, email, password }); 
  const token =  user.createJWT()
    res.status(StatusCodes.CREATED).json({user :{email:user.email, name:user.name, lastName: user.lastName }, token , location : user.location})

};



const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError('please provide all credentials')
  }
  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    throw new UnAuthenticatedError('invalid credentials');
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError('wrong password');
  }
  const token = user.createJWT() 
  user.password = undefined; 
  res.status(StatusCodes.OK).json({ user, token, location:user.location })
}
  

const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body
  if (!email || !name || !lastName || !location) {
    throw new BadRequestError('please provide all values')
  }
  const user = await User.findOne({ _id: req.user.userId })
  user.email = email
  user.name = name
  user.lastName = lastName
  user.location = location
  await user.save()

  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

export { register, login, updateUser };
