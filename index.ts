import { httpServer } from './src/http_server/index';
import * as dotenv from 'dotenv';

dotenv.config();

const HTTP_PORT = Number(process.env.APP_HTTP_PORT) || 8181;

httpServer.listen(HTTP_PORT, () => {
  console.log(`Start static http server on the ${HTTP_PORT} port!`);
});
