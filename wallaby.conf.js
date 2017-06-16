//http://localhost:51245/
module.exports = function (wallaby) {
    return {
        files: [
            'server/src/**/*.ts'
        ],
        tests: [
            'server/tests/unit/**/*spec.ts'
        ],
        compilers: {
            'server/**/*.ts?(x)': wallaby.compilers.typeScript({
                module: 'commonjs'
            })
        },
        filesWithNoCoverageCalculated: [
            'server/src/app.ts'
        ],
        env: {
            type: 'node'
        }
    };
};

