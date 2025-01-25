const { env } = require('process');
const os = require('os');

function getLocalIPAddress() {
  const interfaces = os.networkInterfaces();
  for (const interfaceName in interfaces) {
    for (const iface of interfaces[interfaceName]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

const localIPAddress = getLocalIPAddress();

const target = env.ASPNETCORE_HTTPS_PORT ? `https://${localIPAddress}:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7048;https://${localIPAddress}:7048'

const PROXY_CONFIG = [
  {
    context: [
      "/chamados/sync', '/veiculos/sync', '/consignados/sync', '/nobreaks/sync'"
    ],
    target,
    secure: false,
    changeOrigin: true
  }
]

module.exports = PROXY_CONFIG;
