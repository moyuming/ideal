module.exports = {
  root: true,
  env: {
    node: true
  },
  rules: {
    'no-console': 'error',
    'no-debugger': 'error',
    "indent": 0,
    "linebreak-style": 0,
    "quotes": 0,
    "arrow-spacing": ["error", { "before": true, "after": true }],
    "semi": ["error", "never"],
    "comma-spacing": ["error", { "before": false, "after": true }],
    "no-console": "off",
  }
}