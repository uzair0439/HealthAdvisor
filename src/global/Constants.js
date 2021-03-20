export const Colors = {
  white: "#fff",
  blue: "#0000CD",
  orange: "#13293B",
  secondary: "#1c88eb",
  lightOrange: "#f0aa75",
};

export const EXCERCISE = [
  { image: require("../assets/excercise/chest.png"), title: "Chest" },
  { image: require("../assets/excercise/bicep.png"), title: "Bicep" },
  { image: require("../assets/excercise/bicep.png"), title: "Tricep" },
  { image: require("../assets/excercise/back.png"), title: "Back" },
  { image: require("../assets/excercise/shoulder.png"), title: "Shoulder" },
  { image: require("../assets/excercise/thoys.png"), title: "Legs" },
];

export const detail = {
  chest: [
    {
      title: "Chest press Rod",
      image: require("../assets/chest/chestpress.jpg"),
      sets: 3,
      detail: [
        { reps: 10, weight: 20 },
        { reps: 15, weight: 30 },
        { reps: 20, weight: 40 },
      ],
    },
    {
      title: "Dumble Chest Press",
      image: require("../assets/chest/dumblepress.jpg"),
      sets: 3,
      detail: [
        { reps: 12, weight: 10 },
        { reps: 16, weight: 20 },
        { reps: 22, weight: 30 },
      ],
    },
  ],
  bicep: [
    {
      title: "Standing Dumbells Curves",
      image: require("../assets/bicep/bicepsingle.jpg"),
      sets: 3,
      detail: [
        { reps: 15, weight: 16 },
        { reps: 18, weight: 20 },
        { reps: 20, weight: 24 },
      ],
    },
    {
      title: "Dumbbell Curls",
      image: require("../assets/bicep/bicepdouble.jpg"),
      sets: 3,
      detail: [
        { reps: 12, weight: 10 },
        { reps: 15, weight: 14 },
        { reps: 18, weight: 16 },
      ],
    },
  ],
  tricep: [
    {
      title: "Tricep Dips",
      image: require("../assets/tricep/tricepsdip.jpg"),
      sets: 3,
      detail: [
        { reps: 9, weight: 16 },
        { reps: 12, weight: 20 },
        { reps: 15, weight: 24 },
      ],
    },
    {
      title: "Overhead Cable Extension",
      image: require("../assets/tricep/cabletricep.jpg"),
      sets: 3,
      detail: [
        { reps: 12, weight: 10 },
        { reps: 15, weight: 14 },
        { reps: 18, weight: 16 },
      ],
    },
    {
      title: "Cable Rope Triceps Pushdown",
      image: require("../assets/tricep/down.jpg"),
      sets: 3,
      detail: [
        { reps: 12, weight: 10 },
        { reps: 15, weight: 14 },
        { reps: 18, weight: 16 },
      ],
    },
  ],
  back: [
    {
      title: "One Arm Dumbbell Row",
      image: require("../assets/back/onearm.webp"),
      sets: 3,
      detail: [
        { reps: 15, weight: 16 },
        { reps: 18, weight: 20 },
        { reps: 20, weight: 24 },
      ],
    },
    {
      title: "Romanian Deadlift",
      image: require("../assets/back/roman.webp"),
      sets: 3,
      detail: [
        { reps: 12, weight: 10 },
        { reps: 15, weight: 14 },
        { reps: 18, weight: 16 },
      ],
    },
  ],
  shoulder: [
    {
      title: "Lateral Raises",
      image: require("../assets/shoulder/lateral.webp"),
      sets: 3,
      detail: [
        { reps: 15, weight: 16 },
        { reps: 18, weight: 20 },
        { reps: 20, weight: 24 },
      ],
    },
    {
      title: "Front Raises",
      image: require("../assets/shoulder/front.webp"),
      sets: 3,
      detail: [
        { reps: 12, weight: 10 },
        { reps: 15, weight: 14 },
        { reps: 18, weight: 16 },
      ],
    },
  ],
  legs: [
    {
      title: "Leg Press ",
      image: require("../assets/legs/legpress.png"),
      sets: 3,
      detail: [
        { reps: 15, weight: 16 },
        { reps: 18, weight: 20 },
        { reps: 20, weight: 24 },
      ],
    },
    {
      title: "Dumbbell Lunges",
      image: require("../assets/legs/squatslunges.jpg"),
      sets: 3,
      detail: [
        { reps: 12, weight: 10 },
        { reps: 15, weight: 14 },
        { reps: 18, weight: 16 },
      ],
    },
    {
      title: "Barbell Squat",
      image: require("../assets/legs/squats.jpg"),
      sets: 3,
      detail: [
        { reps: 12, weight: 10 },
        { reps: 15, weight: 14 },
        { reps: 18, weight: 16 },
      ],
    },
  ],
};

export const DASHBOARDDATA = [
  {
    title: "Activity",
    screen: "HomeScreen",
    image: require("../assets/dashboard/home.png"),
  },
  {
    title: "Diet Planner",
    screen: "DietScreen",
    image: require("../assets/dashboard/diet.png"),
  },
  {
    title: "Excercises",
    screen: "Excercise",
    image: require("../assets/dashboard/excersise.png"),
  },
  {
    title: "Pedometer",
    screen: "Pedo",
    image: require("../assets/dashboard/pedometer.png"),
  },
  {
    title: "Logout",
    screen: "",
    image: require("../assets/dashboard/logout.png"),
  },
];

export const FoodPickerData = [
  { label: "Asparagus", calories: 16, selected: false },
  { label: "Black Olives", calories: 16, selected: false },
  { label: "Cabbage", calories: 25, selected: false },
  { label: "Carrot", calories: 40.98, selected: false },
  { label: "Cauliflower", calories: 23, selected: false },
  { label: "Cucumber", calories: 17, selected: false },
  { label: "Peas", calories: 79, selected: false },
  { label: "Potato", calories: 77, selected: false },
  { label: "Pumpkin", calories: 26, selected: false },
  { label: "Spinach", calories: 23, selected: false },
  { label: "Apple", calories: 45, selected: false },
  { label: "Banana", calories: 95, selected: false },
];
