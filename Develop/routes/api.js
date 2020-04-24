const express = require("express");
const app = express();
const path = require("path");
const router = require("express").Router();
const Workout = require("../models/workout.js");

router.get("/api/workouts", (req, res) => {
  Workout.find({})
    .sort({ date: -1 })
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
  Workout.findOneAndUpdate(req.params.id, req.body)
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.status(400).json(err);
  });
})

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "/index.html"));
})

router.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "/exercise.html"));
})

router.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "/stats.html"));
})



module.exports = router;
