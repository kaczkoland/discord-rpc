import { Client } from 'discord-rpc';
export default class RPCHandler {
  rpc: any;
  ready: boolean;
  constructor() {
    this.ready = false;
    const connect = () => {
      this.rpc = new Client({ transport: 'ipc' });
      this.rpc.login({ clientId: '587295793627529246' }).catch(() => {
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
    if (!data.onlinePlayers && !data.maxPlayers) {
      return;
    }
    const object = {
      details: data.onlinePlayers + '/' + data.maxPlayers + ' graczy',
      state: 'kaczkoland.pl',
      largeImageKey: 'logo',
      largeImageText: "Wersja 1.16.4+",
      buttons: [
        { label: 'Serwer Discord', url: 'https://discord.com/invite/MfH5qN4' },
        { label: 'Strona internetowa', url: 'https://kaczkoland.pl' },
      ],
    };
    // if (data?.duration === '0' || !data) {
    //   return object;
    // } else {
    //   // @ts-ignore
    //   object.endTimestamp = Date.now() + parseInt(data?.duration);
    // }
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
