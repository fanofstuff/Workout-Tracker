const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
  },
  totalDuration: {
    type: Number
  },
  exercises: [
    {
      type: {
        type: String,
        trim: true,
        enum: ["resistance", "cardio"],
        required: "Choose an exercise type",
      },
      name: {
        type: String,
        trim: true,
        required: "Choose an activity",
      },
      duration: {
        type: Number,
        required: "Enter a duration",
      },
      weight: {
        type: Number,
      },
      reps: {
        type: Number,
      },
      sets: {
        type: Number,
      },
      distance: {
        type: Number,
      },
    },
  ],
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
