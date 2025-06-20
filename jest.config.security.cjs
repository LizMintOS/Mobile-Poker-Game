module.exports = {
    setupFilesAfterEnv: ["<rootDir>/setupApiTests.ts"],
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
    transformIgnorePatterns: ["node_modules/(?!.*@vite|react|fetch-blob|node-fetch|whatwg-stream|web-streams-polyfill)/"],
  };
  