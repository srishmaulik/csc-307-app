import express from "express";
import cors from "cors";
import userService from "./user-service.js"; // Import the user service
import dotenv from "dotenv";
import mongoose from "mongoose";


dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING)
  .catch((error) => console.log(error));

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Get users with optional name and job filters
app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  userService.getUsers(name, job)
    .then((users) => {
      res.send({ users_list: users });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Get user by ID
app.get("/users/:id", (req, res) => {
  const id = req.params.id;

  userService.findUserById(id)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).send("Resource not found.");
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Add new user
app.post("/users", (req, res) => {
  const userToAdd = req.body;

  userService.addUser(userToAdd)
    .then((addedUser) => {
      res.status(201).send(addedUser);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Delete user by ID
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  userService.findUserByIdAndDelete(id)
    .then((deletedUser) => {
      if (deletedUser) {
        res.status(204).send(); // Return 204 status code for successful delete
      } else {
        res.status(404).send("Resource not found.");
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});