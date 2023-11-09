const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const fs = require('fs');
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: path.resolve(__dirname, '../backend/public/'), // frontend 파일이 backend에 저장될 위치
  devServer: {
    // https: {
    //   key: fs.readFileSync("./config/localhost-private.pem"),
    //   cert: fs.readFileSync("./config/localhost-cert.pem"),
    // },
    // 프록시 설정
    proxy: {
      // 프록시 요청을 보낼 api의 시작 부분
      '/api': {
          // 프록시 요청을 보낼 서버의 주소
          target: process.env.VUE_APP_HOST
      },
      '/swagger': {
        target: process.env.VUE_APP_HOST
      }
    }
  }
});