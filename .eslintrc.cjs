module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:storybook/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  settings: {
    react: {
      version: "detect",
      pragma: "React",
    },
  },
  /**
   * @param {rules > *} 0 忽略、1 警告、2 报错
   * */
  rules: {
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/ban-types": 0,
    "@typescript-eslint/no-unused-vars": 0,
    "@typescript-eslint/no-empty-function": 0,
    // 从字面量推断类型，删除类型注释
    "@typescript-eslint/no-inferrable-types": 0,
    "react/react-in-jsx-scope": 0,
    quotes: 0, // 要求使用双引号
    "no-console": 1,
    "space-before-function-paren": 0,
    semi: 2,
    // 结尾分号校验
    "no-trailing-spaces": 2,
    // 禁止行尾空格
    "react/prop-types": 0,
    // 防止在react组件定义中缺少props验证
    "space-infix-ops": 2,
    //  要求操作符周围有空格
    "no-multi-spaces": 2,
    // 禁止使用多个空格
    "no-var": 2,
    // 要求使用 let 或 const 而不是 var,
    "no-unused-vars": 0,
    // 禁止出现未使用过的变量
    eqeqeq: 1,
    // 必须使用 === 和 !==
    "no-empty-function": 0,
    // 禁止空函数
    "space-in-parens": 2, // 强制在圆括号内使用一致的空格，前后不出现空格
  },
};
