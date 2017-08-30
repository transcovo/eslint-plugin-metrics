/**
 * @fileoverview Check metrics definition
 * @author Gilles Rasigade
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/metrics-definition"),

    RuleTester = require('eslint').RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("metrics-definition", rule, {

    valid: [
        'metric.increment("test.eslint")',
        'metrics.increment("test.eslint")'
    ],

    invalid: [
        {
            code: "metrics.increment(12)",
            errors: [{
                message: "The single argument must be of type string.",
                type: ""
            }]
        },
        {
            code: "metrics.increment('12', 34)",
            errors: [{
                message: "Only a single argument is accepted on metrics.increment.",
                type: ""
            }]
        }
    ]
});
