const PROXY_CONFIG = [
  {
    context: [
      '/bms'
  ],
  // target: 'http://192.168.1.104:8000',
  // target: 'http://192.168.1.66:8000',
  target: 'http://192.168.1.66:8000',
  secure: true,
  changeOrigin: true,
  headers: { host: 'localhost:4200' },
  }
]


module.exports = PROXY_CONFIG;
