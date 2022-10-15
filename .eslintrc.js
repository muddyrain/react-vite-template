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
    // "quotes": 0, // 要求使用双引号
    "no-console": 1,
    "space-before-function-paren": 0,
    semi: 2, // 结尾分号校验
    "no-trailing-spaces": 2, // 禁止行尾空格
    "react/prop-types": 0, // 防止在react组件定义中缺少props验证
    "space-infix-ops": 2, //  要求操作符周围有空格
    "no-multi-spaces": 2, // 禁止使用多个空格
    "no-var": 2, // 要求使用 let 或 const 而不是 var,
    "no-unused-vars": 1, // 禁止出现未使用过的变量
    eqeqeq: 1, // 必须使用 === 和 !==
    "no-empty-function": 1, // 禁止空函数
    "space-in-parens": 2, // 强制在圆括号内使用一致的空格，前后不出现空格
  },
};
