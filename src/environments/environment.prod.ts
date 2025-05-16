import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: false,
  apiUrl: 'https://atlas-t65l.onrender.com' // Coloque o IP do seu PC aqui!
};
