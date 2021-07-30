module.exports = {
  plugins: [
    // ES8 문법인 async/await를 사용해 비동기 함수를 작성하면 regenerator를 제공하지 않아서 아래와 같은 에러 발생
    // Uncaught ReferenceError: regeneratorRuntime is not defined
    "@babel/plugin-transform-runtime" 
  ],
  presets: [
    "@babel/preset-env",
    "@babel/preset-react",    
  ]
}