/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

const { resolve } = require('path');
const root = resolve(__dirname);


module.exports = {

  displayName: 'unit-tests',

  testEnvironment: 'node',

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
   moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
    '@test/(.*)': '<rootDir>/test/$1',

   },

   // A preset that is used as a base for Jest's configuration
   preset: "ts-jest",

  // The root directory that Jest should scan for tests and modules within
   rootDir: root,

  // A list of paths to directories that Jest should use to search for files in
   roots: [
    "<rootDir>",
   ],

  // The glob patterns Jest uses to detect test files
  testMatch: ['<rootDir>/src/**/*.test.ts'],

 
};