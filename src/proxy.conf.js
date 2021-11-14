const PROXY_CONFIG = [
  {
    context: [
      '/action'
  ],
  // target: 'http://192.168.1.104:8000',
  // target: 'http://192.168.1.66:8000',
  target: 'http://172.30.1.47:8080',
  secure: true,
  changeOrigin: true,
  headers: { host: '172.30.1.47:4222' },
  }
]


module.exports = PROXY_CONFIG;
