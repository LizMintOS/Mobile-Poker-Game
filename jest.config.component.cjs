module.exports = {
  setupFilesAfterEnv: ["<rootDir>/setupComponentTests.ts"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.tsx?$": "babel-jest",
    "^.+\\.svg$": "jest-transformer-svg",
    "^.+\\.css$": "jest-transform-css",
  },
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/__tests__/api/"],
  transformIgnorePatterns: ["node_modules/(?!.*@vite|react)/"],
};
