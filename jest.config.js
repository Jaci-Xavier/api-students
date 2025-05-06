module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverage: true,
  coverageDirectory: '../coverage',
  coverageProvider: 'v8',
  coveragePathIgnorePatterns: ['/node_modules/', 'src/prisma/*'],
};
