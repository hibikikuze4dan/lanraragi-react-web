module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/jsx-one-expression-per-line": "off",
    quotes: "off",
    "comma-dangle": "off",
    "import/extensions": "off",
    "react/jsx-filename-extension": "off",
    "react/function-component-definition": "off",
    "react/prop-types": "off",
    "implicit-arrow-linebreak": "off",
    "no-param-reassign": "off",
    "operator-linebreak": "off",
    "import/prefer-default-export": "off",
    "import/no-named-as-default": "off",
    "no-console": "off",
    "object-curly-newline": "off",
  },
};
