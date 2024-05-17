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
  },
};