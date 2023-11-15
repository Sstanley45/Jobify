import Job from "../models/jobModels.js";
import { StatusCodes } from "http-status-codes"; 
import { BadRequestError, NotFoundError, UnAuthenticatedError } from "../Errors/index.js";  
import checkPermissions from "../utils/checkPermissions.js";



const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId })
  res.status(StatusCodes.OK).json({jobs, jobsLength : jobs.length, numberOfPage : 1})
}

const getJob = async (req, res) => {
  res.send("getJob");
};

const createJob = async (req, res) => {
  const { company, position } = req.body
  if (!company || !position) {
    throw new BadRequestError("please provide all values")
  }
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({job})
};

const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { company, position } = req.body;
  if (!company || !position) {
    throw new BadRequestError("please provide all values");
  }

  const job = await Job.findOne({ _id: jobId });
  if (!job) {
    throw new NotFoundError(`no job found with id : ${jobId}`);
  }

   //check permissions
  checkPermissions(req.user, job.createdBy)

  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ updatedJob });
};


const deleteJob = async (req, res) => {
  const { id: jobId } = req.params
   const job = await Job.findOne({ _id: jobId });
   if (!job) {
     throw new NotFoundError(`no job found with id : ${jobId}`);
   }

   //check permissions
  checkPermissions(req.user, job.createdBy);
  await job.remove()
  res.status(StatusCodes.OK).json({msg : 'job removed '})
  
};
const showStats = async (req, res) => {
  res.send("showStats");
};

export {getAllJobs, getJob, createJob, updateJob, deleteJob,showStats}