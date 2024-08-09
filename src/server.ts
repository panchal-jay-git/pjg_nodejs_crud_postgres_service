import Logger from './core/logger';
import { port } from './config';
import app from './app';

if(port) {
  app
  .listen(+port, '', () => {
    Logger.info(`server running on port : ${port}`);
  })
  .on('error', (e: any) => Logger.error(e));
}
