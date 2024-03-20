module.exports = {
    roots: ["<rootDir>"],
    testMatch: ["**/__tests__/**/*.js", "**/?(*.)+(spec|test).js"],
    transform: {
      "^.+\\.js$": "babel-jest"
    }
  };