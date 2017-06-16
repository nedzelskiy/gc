'use strict';

const fs = require('fs');
const recursive = require("recursive-readdir");
const prompt = require('prompt');

const ignoreFunc = (file, stats) => {
    let ext = file.split('.').pop();
    return !stats.isDirectory() &&  (ext !== 'js' && ext !== 'jsx');
};

const clientPromise = new Promise((resolve, reject) => {
    recursive("client/",[
            '*.ts',
            '*.tsx',
            'client/common/assets/*',
            ignoreFunc
        ], function (err, files) {
            err && reject(err);
            !err && resolve(files);
    });

});

const serverPromise = new Promise((resolve, reject) => {
    recursive("server/",[
        '*.ts',
        ignoreFunc
    ], function (err, files) {
        err && reject(err);
        !err && resolve(files);
    });
});

Promise.all([
    clientPromise,
    serverPromise
]).then(results => {
    let filesArr = results.reduce(function(result, current) {
        return result.concat(current);
    }, []);
    console.log('Will be deleted this files: ');
    console.log('==========================');
    console.log(filesArr);
    console.log('==========================');
    console.log('Looks good [y/N] ?');
    prompt.start();

    prompt.get(['answer'], function (err, result) {
        if (err) throw err;
        const answer = result['answer'];
        if (answer.toLowerCase() === 'y') {
            filesArr.forEach(file => {
                console.log('deleting...  ' + file);
                fs.unlinkSync(file);
            });
        }
    });

}).catch(err => {
   console.log(err);
});