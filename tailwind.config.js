module.exports = {
    content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        colors: {
          'pizza-yellow': '#FFC300',
          'pizza-red': '#FF0000',
          'pizza-white': '#FFFFFF',
        },
        fontFamily: {
          'pizza': ['PizzaFont'],
        },
      },
    },
    plugins: [],
  }