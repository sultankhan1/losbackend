module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[t]s'], // Match both .spec.ts and .test.ts files in any folder
  moduleFileExtensions: ['ts', 'js', 'json', 'node'], // Ensure TypeScript files are resolved
  coverageDirectory: './coverage', // Optional: for generating coverage reports
  collectCoverageFrom: ['src/**/*.ts'], // Optional: to specify which files should be included in coverage
  rootDir: '.', // Make sure Jest runs from the project root
  setupFilesAfterEnv: ['<rootDir>/prisma/jest.setup.ts'], // Update the path if necessary
};