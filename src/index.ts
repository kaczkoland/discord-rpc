import RPCHandler from './handlers/RPCHandler';
import get from 'axios';
import util from 'minecraft-server-util';

const RPHandler = new RPCHandler();

const seconds = 10;

setInterval(async () => {
  const status = await util.query('kaczkoland.pl', { port: 25565 });
  if (RPHandler.ready && status !== undefined) {
    const rp = RPHandler.parseToRP(status);
    // @ts-ignore
    RPHandler.setRP(rp);
  }
}, seconds*1000);
