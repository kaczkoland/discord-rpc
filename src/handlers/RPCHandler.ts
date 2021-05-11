import { Client } from 'discord-rpc';
export default class RPCHandler {
  rpc: any;
  ready: boolean;
  constructor() {
    this.ready = false;
    const connect = () => {
      this.rpc = new Client({ transport: 'ipc' });
      this.rpc.login({ clientId: '789532463465889873' }).catch(() => {
        console.log('Could not connect, retrying in 5 seconds');
        setTimeout(connect, 5000);
      });
      this.rpc.on('ready', () => {
        this.ready = true;
      });
      // @ts-ignore
      this.rpc.on('disconnected', () => {
        console.log('Disconnected, trying to reconnect in 5 seconds!');
        setTimeout(connect, 5000);
      });
    };
    connect();
  }
  parseToRP(data: any) {
    if (!data.players) {
      return;
    }
    const object = {
      details: data.players.online + '/' + data.players.max + ' graczy',
      state: 'papugoland.me',
      largeImageKey: 'papuga',
      largeImageText: data.version,
      buttons: [
        { label: 'Serwer Discord', url: 'https://discord.gg/VArQNt9PvC' },
        { label: 'Strona internetowa', url: 'https://papugoland.me/' },
      ],
    };

    if (data?.duration === '0' || !data) {
      return object;
    } else {
      // @ts-ignore
      object.endTimestamp = Date.now() + parseInt(data?.duration);
    }
    return object;
  }
  setRP(
    data:
      | {
          details: string;
          state: string;
          largeImageKey: string;
          largeImageText: string;
          startTimestamp: number;
          endTimestamp?: number;
          buttons: any[];
        }
      | boolean,
  ) {
    if (!data) {
      this.rpc.clearActivity();
    }
    this.rpc.setActivity(data);
  }
  clear() {
    this.rpc.clearActivity();
  }
}
