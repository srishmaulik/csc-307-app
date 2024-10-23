import mongoose from "mongoose";
import userModel from "../models/user.js";

mongoose.set("debug", true);



function getUsers(name, job) {
    let promise;
    if (name === undefined && job === undefined) {
      promise = userModel.find(); // Fetch all users
    } else if (name && job) {
      // Fetch users by both name and job
      promise = findUserByNameAndJob(name, job);
    } else if (name) {
      promise = findUserByName(name); // Fetch users by name
    } else if (job) {
      promise = findUserByJob(job); // Fetch users by job
    }
    return promise;
  }
  function findUserById(_id) {
  return userModel.findById(_id);
}

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}
function findUserByNameAndJob(name, job) {
    return userModel.find({ name: name, job: job });
  }


function findUserByIdAndDelete(_id) {
    return userModel.findByIdAndDelete(_id); // Delete user by ID
  }
export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  findUserByNameAndJob,
  findUserByIdAndDelete
};