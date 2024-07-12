import express from "express";

const app = express();

const port = 3000;

//Test-1

// app.get("/", (req, res) => {
//   res.send("Hi I am harsha");
// });

// app.get("/hi", (req, res) => {
//   res.send("Ice Cream");
// });

// app.get("/bye", (req, res) => {
//   res.send("Kick Out");
// });

//Test-1

app.use(express.json());

let textData = [];
let nextId = 1;

//add new god
app.post("/god", (req, res) => {
  const { god, location } = req.body;
  const newGod = { id: nextId++, god, location };
  textData.push(newGod);
  res.status(201).send(newGod);
});

//get all gos
app.get("/gods", (req, res) => {
  res.status(200).send(textData);
});

//getparticular god with id
app.get("/god/:id", (req, res) => {
  const godObj = textData.find((g) => g.id === parseInt(req.params.id));
  if (!godObj) {
    return res.status(400).send("Not FOund");
  } else {
    return res.status(200).send(godObj);
  }
});

//update
app.put("/god/:id", (req, res) => {
  const godObj = textData.find((g) => g.id === parseInt(req.params.id));
  if (!godObj) {
    return res.status(400).send("Not Found");
  }
  const { god, location } = req.body;
  godObj.god = god;
  godObj.location = location;
  res.status(200).send(godObj);
});

app.delete("/god/:id", (req, res) => {
  const godindex = textData.findIndex((g) => g.id === parseInt(req.params.id));

  if (godindex === -1) {
    return res.status(404).send("not found");
  }
  textData.splice(godindex, 1);
  return res.status(200).send("deleted");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
