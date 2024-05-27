// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

// module.exports = {
//   //...
//   devServer: {
//     client: {
//       overlay: {
//         errors: true,
//         warnings: false,
//         runtimeErrors: true,
//       },
//     },
//   },
// };

// module.exports = {
//   // your configurations
// };

module.exports = {
  devServer: {
    client: {
      overlay: {
        errors: true,
        warnings: false,
        runtimeErrors: true,
      },
    },
    port: 9080, // 포트 설정 추가
  },
};