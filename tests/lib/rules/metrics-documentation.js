/**
 * @fileoverview Check metrics documentation
 * @author Gilles Rasigade
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/metrics-documentation"),

    RuleTester = require('eslint').RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("metrics-documentation", rule, {

    valid: [
        `
/**
 * @metric test.eslint This metric is incremented on each eslint test
 */
metrics.increment('test.eslint');
`,`
// @metric test.eslint This metric is incremented on each eslint test
metrics.increment('test.eslint');`
        // give me some code that won't trigger a warning
    ],

    invalid: [
        {
            code: `
metrics.increment("test.eslint")`,
            errors: [{
                message: "Missing metric definition.",
                type: ""
            }]
        },
        {
            code: `
/**
 *
 */
metrics.increment("test.eslint")`,
            errors: [{
                message: "The metric must be commented (test.eslint).",
                type: ""
            }]
        },
        {
            code: `
/**
 * @metric test.eslint
 */
metrics.increment("test.eslint")`,
            errors: [{
                message: "The metric comment is wrongly formatted.",
                type: ""
            }]
        }
    ]
});
