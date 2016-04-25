/*eslint-disable*/
module.exports = {
  'extends': 'airbnb',
  'globals': {
    'expect': true,
    'it': true,
    'describe': true,
    'afterEach': true,
    'console.error': true,
  },
  'rules': {
    'max-len': [
      1,
      120,
      2, {
        ignoreComments: true
      }
    ],
    'quote-props': [
      1, 'consistent-as-needed'
    ],
    'no-cond-assign': [
      2, 'except-parens'
    ],
    'radix': 0,
    'space-infix-ops': 0,
    'no-unused-vars': [
      1, {
        'vars': 'local',
        'args': 'none'
      }
    ],
    'default-case': 0,
    'no-else-return': 0,
    'no-param-reassign': 0,
    'space-before-function-paren': 0,
    'react/arrow-body-style': 0,
    'arrow-body-style': 0,
    // 'react/prop-types': 0,
    'no-console': 1,
  },
  'parser': 'babel-eslint'
};
