import type { Config } from '@jest/types';

const baseDir = '<rootDir>/src/app/server_app';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: false,
  collectCoverageFrom: [
    `${baseDir}/**/*.ts`,
  ],
  testMatch: [
    `${baseDir}/**/*.spec.ts`,
    `${baseDir}/**/*.test.ts`,
  ]
}

export default config;
