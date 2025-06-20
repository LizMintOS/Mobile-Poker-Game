poker-game-2025.web.app

# Instructions

    "test:components": "jest --config=jest.config.component.cjs",

    "test:api": "jest --config=jest.config.api.cjs",

    "test:sec": "jest --config=jest.config.security.cjs",

**When running tests** you need to run the specific command depending on what you want to test as above

To **run api or component tests**, you need to **comment out** the last 2 lines of the `/src/services/firebase.ts` file.

Then, run the following:
```bash
npm run test:api
// or
npm run test:components
```

To **run security tests** you need to make sure the last 2 lines of the `/src/services/firebase.ts` file are **uncommented**. This is the code relating to running the emulator.

Then, run the following script:

```bash
npm run dev && emu && test:sec
```
