module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': 'google',
  'overrides': [
    {
      'env': {
        'node': true,
      },
      'files': [
        '.eslintrc.{js,cjs}',
      ],
      'parserOptions': {
        'sourceType': 'script',
      },
    },
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    'eslint-rules'  // Asume que 'eslint-rules' es el nombre que das a tu configuración de plugin en src/index.js
  ],
  'rules': {
    'semi': ['error', 'never'],  // Regla existente para prohibir punto y coma
    'eslint-rules/no-semi': 'error'  // Utiliza la regla personalizada
  },
  'settings': {
    // Añade un ajuste si tu estructura de directorios requiere que especifiques la ubicación del plugin
    'eslint-rules': {
      rulePaths: ['./src']  // Ajusta el camino al directorio donde se encuentra tu index.js para el plugin
    }
  }
}
