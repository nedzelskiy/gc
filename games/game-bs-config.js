'use strict';
const fallback = require('connect-history-api-fallback');

module.exports = {
    server: {
        middleware: {
            1: fallback({
                index: '/test.html',
                htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'] // systemjs workaround
            })
        }
    }
};