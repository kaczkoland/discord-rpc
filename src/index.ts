import RPCHandler from './handlers/RPCHandler';
import get from 'axios';
const RPHandler = new RPCHandler();
setInterval(async () => {
  const data = await get('https://api.mcsrvstat.us/2/kaczkoland.pl');
  if (RPHandler.ready) {
    const rp = RPHandler.parseToRP(data.data);
    // @ts-ignore
    RPHandler.setRP(rp);
  }
}, 3000);
