'use strict';
// for webpack
var req = require.context('./', true, /[sS]pec\.ts$/);
req.keys().forEach(req);