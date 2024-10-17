import express from "express";
import cors from "cors";
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  const index = users["users_list"].findIndex((user) => user.id === id);
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    users["users_list"].splice(index, 1);
    res.send();
  }
});

const addUser = (user) => {
  user.id = generate_id();
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  const addeduser = addUser(userToAdd);
  res.status(201).send(addeduser); 
});

const generate_id = () => {  return Math.random().toString(36).substring(2, 9);
};

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  const index = users["users_list"].findIndex((user) => user.id === id);

  if (index === -1) {
    res.status(404).send("Resource not found.");
  } else {
    users["users_list"].splice(index, 1);
    res.status(204).send(); // Return 204 status code for successful delete
  }
});