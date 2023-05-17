const classes = {
  pulsate: {
    animation: "pulsate 1s ease-out",
    animationIterationCount: "infinite",
    color: "#9c27b0",
  },

  "@keyframes pulsate": {
    "0%": {
      transform: "scale(1)",
    },
    "50%": {
      transform: "scale(1.1)",
    },
    "100%": {
      transform: "scale(1)",
    },
  },
};

export default classes;
