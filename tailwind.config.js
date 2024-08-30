/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
      Mukta: ["Mukta"],
      Poppins: ["Poppins"],
    },

    extend: {
      colors: {
        logoTextPrimaryColor: "#00AFEF",
        logoTextSecondaryColor: "#F93B2B",
        logoTextTernaryColor: "#6C7685",
        logoLineColor: "#009FD9",
        navbarBgColor: "#006083",
        navTextColor: "#FFFFFF",
        headlineBgColorPrimary: "#F93B2B",
        headlineBgColorSecondary: "#107172",
        redBtn: "bg-red-400",
        tableRowBgColor: "bg-gray-100",
      },
      flex: {
        big: "1 1 78%",
        small: "1 1 18%",
      },
      fontSize: {
        newsType: "40px",

        // Add more font size classes as needed
      },
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        // Add other rules as needed for different file types
      ],
    },
  },
  plugins: [],
};
