const path = require('path')

module.exports = {
  root: true,
  /* 指定如何解析语法。*/
  parser: 'vue-eslint-parser',
  /* 优先级低于parse的语法解析配置 */
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    'browser': true,
    'node': true,
    //使用setup语法糖
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended', // typescript-eslint推荐规则,
    'plugin:import/typescript',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    'import/resolver': {
      typescript: {
        project: path.resolve(__dirname, './tsconfig.json'),
      },
    },
  },
  rules: {
    'prettier/prettier': 1,
    '@typescript-eslint/no-explicit-any': 'off',
    // 关闭此规则 使用 prettier 的格式化规则， 感觉prettier 更加合理，
    // 而且一起使用会有冲突
    'vue/max-attributes-per-line': 0,
    'vue/multi-word-component-names': 0,
    'import/extensions': [
      2,
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-console': 0,
    'no-param-reassign': 0,
    'import/no-extraneous-dependencies': 0,
    // debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
  },
}
