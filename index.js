const express = require("express");

const app = express();
app.use(express.json());
const port = 3000;

var users = [
  {
    name: "Jhon",
    kidneys: [
      {
        healthy: false,
      },
      {
        healthy: false,
      },
    ],
  },
];
// console.log(users[0].kidneys[0].healthy)

app.get("/", (req, res) => {
  res.json({
    NumberOfKidneys: users[0].kidneys.length,
    NumberofHealtyKidneys: users[0].kidneys.filter((kidney) => kidney.healthy)
      .length,
    NumberofUnHealtyKidneys: users[0].kidneys.filter(
      (kidney) => !kidney.healthy,
    ).length,
  });
});

app.post("/", (req, res) => {
  const ishealthy = req.body.ishealthy;
  users[0].kidneys.push({
    healthy: ishealthy,
  });
  res.status(200).send({ msg: "Kidney added" });
});

app.put("/", (req, res) => {
  
  if (users[0].kidneys.filter((kidney) => !kidney.healthy).length === 0) {
    res.status(411).send({ msg: "No Unhealthy kidneys" });
    return;
  }
  users[0].kidneys.forEach((kidney) => {
    // console.log(kidney.healthy);
    if (kidney.healthy === false) {
      kidney.healthy = true;
    }
  });

  res.status(200).send({ msg: "Kidney updated" });
});

app.delete("/", (req, res) => {
  const healthyKidneys = users[0].kidneys.filter((kidney) => kidney.healthy);
  console.log(healthyKidneys);
  if (users[0].kidneys.length === healthyKidneys.length) {
    res.status(411).send({ msg: "No Unhealthy kidneys" });
  }
  users[0].kidneys = healthyKidneys;

  res.status(200).send({ msg: "Kidney deleted" });
});
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
