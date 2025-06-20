module.exports = {
    setupFilesAfterEnv: ["<rootDir>/setupSecurityTests.ts"],
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.jsx?$": "babel-jest",
      "^.+\\.tsx?$": "babel-jest",
    },
    moduleNameMapper: {
      "^src/(.*)$": "<rootDir>/src/$1",
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    testPathIgnorePatterns: ["/node_modules/", "/dist/", "/__tests__/components/", "/__tests__/api/"],
    transformIgnorePatterns: ["node_modules/(?!(@firebase|cross-fetch|fetch-blob|web-streams-polyfill)/)"],
  };
  