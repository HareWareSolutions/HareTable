import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: true,
  apiUrl: 'http://127.0.0.1:2000' // Coloque o IP do seu PC aqui!
};
