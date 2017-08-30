/**
 * @fileoverview Check metrics documentation
 * @author Gilles Rasigade
 */
"use strict";

const METRIC_COMMENT_PATTERN = /@metric [a-z\.]+ .+/
const DYNAMIC_METRIC_COMMENT_PATTERN = /@metric .*/

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Check metrics documentation",
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
                if( node.object &&
                    (node.object.name === 'metrics' || node.object.name === 'metric') &&
                    node.property && node.property.name === 'increment'
                ) {
                    const args = node.parent.arguments
                    const metric = args[0].value;
                    const parent = node.parent.parent;

                    const comments = parent.leadingComments;
                    if (!comments || comments.length === 0) {
                        return context.report(node, 'Missing metric definition.');
                    }

                    if (args[0].type === 'Literal') {
                        if (comments[0].value.indexOf(`@metric ${metric}`) === -1) {
                            return context.report(node, `The metric must be commented (${metric}).`);
                        }

                        if (!METRIC_COMMENT_PATTERN.test(comments[0].value)) {
                            context.report(node, 'The metric comment is wrongly formatted.');
                        }
                    } else {
                        if (!DYNAMIC_METRIC_COMMENT_PATTERN.test(comments[0].value)) {
                            context.report(node, 'The metric comment is wrongly formatted.');
                        }
                    }
                }
            }
        };
    }
};
