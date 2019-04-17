module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    'plugin:prettier/recommended'
  ],
  // required to lint *.vue files
  plugins: ['vue', 'prettier'],
  rules: {
    "no-console": 0,
    "prettier/prettier": [
      0,
      {
        "singleQuote": true,
        // "trailingComma": "none",
        "bracketSpacing": true,
        "jsxBracketSameLine": true
      }
    ],
    'vue/no-parsing-error': [2,{
      'x-invalid-end-tag': false
    }],
    "vue/html-self-closing": "off",
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // don't require .vue extension when importing

    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],

    // "comma-style": ['error', "last"],
    'comma-dangle': [2, "always-multiline"],

    'semi': 'error',

    // allow optionalDependencies

    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],

    // allow debugger during development

    'no-param-reassign': ["error", { "props": false }],
    'no-underscore-dangle': 0,
    "prefer-destructuring": 0,
    "object-curly-newline": 0,
    "function-paren-newline": 0,
    "vue/max-attributes-per-line": "off",
    "max-len": [0, 150, 4],
    'no-param-reassign': ['error', { props: false }],
    'vue/attribute-hyphenation': 'off',

    // "vue/name-property-casing": ["off", "PascalCase|kebab-case"]

    "lines-around-comment": [
      "error",
      {
        "beforeBlockComment": true,
        "afterBlockComment": true,
        "beforeLineComment": true,
        "afterLineComment": true,
        "allowBlockStart": true,
        "allowBlockEnd": true,
        "allowObjectStart": true,
        "allowObjectEnd": true,
        "allowArrayStart": true,
        "allowArrayEnd": true
      }
    ],
    "import/no-extraneous-dependencies": [
      "2",
      {
        "devDependencies": false,
        "optionalDependencies": false,
        "peerDependencies": false
      }
    ],
    'import/extensions': [
      '2',
      'always',
      {
        ignorePackages: false,
        pattern: { // wrap extensions in the `pattern` object
          js: 'never',
        }
      }
    ]
  },
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 6,
    "ecmaFeatures": {
      "jsx": true,
      "modules": true,
      "experimentalObjectRestSpread": true
    }
  }
}