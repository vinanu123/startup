module.exports = {
  prefix: "",
  mode: process.env.TAILWIND_MODE ? "jit" : "",
  purge: {
    content: ["./apps/**/*.{html,ts}", "./libs/**/*.{html,ts}"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        navBar: "232px",
      },
      height: {
        topBar: "60px",
        nowPlayingBar: "90px",
      },
      colors: {
        primary: "#73DA22",
        sliderRail: "#535353",
        primary_button: "#58B50B",
        sliderTrack: "#b3b3b3",
      },
    },
  },
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
  plugins: [],
};
