module.exports = {
    rules: {
        'no-semi': {
            create(context) {
                return {
                    'ExpressionStatement, VariableDeclaration'(node) {
                        if (context.getSourceCode().getText(node).endsWith(';')) {
                            context.report({
                                node,
                                message: 'Unexpected semicolon.',
                            });
                        }
                    }
                };
            }
        }
    }
};s