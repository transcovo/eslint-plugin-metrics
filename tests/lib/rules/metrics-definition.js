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
        'metrics.increment("test.eslint")',
        'metrics.increment.args',
        'metrics.increment.mock',
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
        },
        {
          code: 'var x = metrics.increment.somethingWrong;',
          errors: [{
                message: 'metrics.increment can only be called',
                type: ''
          }]
        },
        {
            code: 'var x = metrics.increment;',
            errors: [{
                message: 'metrics.increment can only be called',
                type: ''
            }]
        }
    ]
});

