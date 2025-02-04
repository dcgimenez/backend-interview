/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: [
        "**/tests/__tests__/unit/**/*.test.ts",
        "**/tests/__tests__/integration/**/*.test.ts"
    ],
    clearMocks: true,
    moduleFileExtensions: ["ts", "js", "json"],
};
