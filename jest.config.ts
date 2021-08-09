export default  {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.(test|spec).ts"],
  coveragePathIgnorePatterns: ["node_modules"],
  silent:false,
  collectCoverage:true,
  coverageReporters: ['json','html','text']
};