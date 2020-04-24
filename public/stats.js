// get all workout data from back-end

//This entire thing is kind of silly - near as I can tell, it's just pasting the data in sequential order
//meaning that it doesn't even seem to be mapped to the date at all! Furthermore, two workouts in one
//day don't actually sum their durations or anything. Bizarre. Not my problem at the moment, though.

// I suspect that we're meant to add in a "sum of all exercises" function to the backend somewhere, actually...

// I'm going to do that last, if at all.

fetch("/api/workouts/range")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    populateChart(data);
  });

API.getWorkoutsInRange();

function generatePalette() {
  const arr = [
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600",
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600",
  ];

  return arr;
}
function populateChart(data) {
  let durations = duration(data);
  // let totalDurations = totalDuration(data);
  let pounds = calculateTotalWeight(data);
  let workouts = workoutNames(data);
  const colors = generatePalette();

  let line = document.querySelector("#canvas").getContext("2d");
  let bar = document.querySelector("#canvas2").getContext("2d");
  let pie = document.querySelector("#canvas3").getContext("2d");
  let pie2 = document.querySelector("#canvas4").getContext("2d");

  let lineChart = new Chart(line, {
    type: "line",
    data: {
      labels: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      datasets: [
        {
          label: "Workout Duration In Minutes",
          backgroundColor: "red",
          borderColor: "red",
          data: durations,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: "Exercise Durations",
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
      },
    },
  });

  let barChart = new Chart(bar, {
    type: "bar",
    data: {
      labels: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      datasets: [
        {
          label: "Pounds",
          data: pounds,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Pounds Lifted",
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });

  let pieChart = new Chart(pie, {
    type: "pie",
    data: {
      labels: workouts,
      datasets: [
        {
          label: "Excercises Performed (by Time)",
          backgroundColor: colors,
          data: durations,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Excercises Performed (by Time)",
      },
    },
  });

  let donutChart = new Chart(pie2, {
    type: "doughnut",
    data: {
      labels: workouts,
      datasets: [
        {
          label: "Excercises Performed (by Weight)",
          backgroundColor: colors,
          data: pounds,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Excercises Performed (by Weight)",
      },
    },
  });
}

function duration(data) {
  let durations = [];

  data.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      durations.push(parseInt(exercise.duration, 10));
    });
  });
  return durations;
}

// function totalDuration(data) {
//   let durations = [];

//   // data.forEach((workout) => {
//   //   console.log(workout);
//   //   workout.exercises.forEach((exercise) => {
//   //     console.log(exercise);
//   //     durations.push(exercise.duration);
//   //   });
//   // });

//     data[0].exercises.forEach((exercise) => {
//       console.log(exercise)
//       const total = exercise.reduce((acc, curr) => {
//         acc.totalDuration = (acc.totalDuration || 0) + curr.duration;
//         console.log(acc);
//         return acc;
//       }, {});
//       console.log(total.totalDuration)
//       return total.totalDuration;
//     })
//   console.log(durations);
//   return durations;
// }

// function totalDuration(exercises) {
//   const total = exercises.reduce((acc, curr) => {
//     acc.totalDuration = (acc.totalDuration || 0) + curr.duration;
//     return acc;
//   }, {});
//   return total.totalDuration;
// }

function calculateTotalWeight(data) {
  let total = [];

  data.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      total.push(exercise.weight);
    });
  });

  return total;
}

function workoutNames(data) {
  let workouts = [];

  data.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      workouts.push(exercise.name);
    });
  });
  return workouts;
}
