/**
 * @fileoverview Check metrics definition
 * @author Gilles Rasigade
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Check metrics definition",
            category: "Fill me in",
            recommended: false
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ]
    },

    create: function(context) {
        // variables should be defined here

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        // any helper functions should go here or else delete this section

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            MemberExpression: function(node) {
                if (node.object &&
                    (node.object.name === 'metrics' || node.object.name === 'metric')
                ) {
                    if (node.property && node.property.name === 'increment') {
                        if (node.parent.type !== 'CallExpression') {
                            /**
                             * If a property exists, we do an exception only for the test
                             * Otherwise, same behavior, it must be a function
                             * -> "args" is used by mocha
                             * -> "mock.calls" is used by jest
                             * For example: "metrics.increment.args" "metrics.increment.mock.calls"
                             */
                            if (!node.parent.property ||
                                (node.parent.property &&
                                !['args', 'mock'].includes(node.parent.property.name))) {
                                context.report(node, 'metrics.increment can only be called');
                            }

                          return;
                        }
                        const args = node.parent.arguments;
                        if (args.length !== 1) {
                            context.report(node, 'Only a single argument is accepted on metrics.increment.');
                        }

                        if (typeof args[0].value !== 'string' && args[0].type !== 'TemplateLiteral') {
                            context.report(node, 'The single argument must be of type string.');
                        }
                    }
                }
            }
        };
    }
};
